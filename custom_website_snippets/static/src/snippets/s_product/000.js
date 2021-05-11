odoo.define('custom_website_snippets.s_product', function (require) {
'use strict';

const config = require('web.config');
const publicWidget = require('web.public.widget');
const utils = require('web.utils');

const ProductWidget = publicWidget.Widget.extend({
    selector: '.s_product',
    events: {
        'click .js_close_product': '_onCloseClick',
        'hide.bs.modal': '_onHideModal',
    },

    /**
     * @override
     */
    start: function () {
        this._productAlreadyShown = !!utils.get_cookie(this.$el.attr('id'));
        if (!this._productAlreadyShown) {
            this._bindProduct();
        }
        return this._super(...arguments);
    },
    /**
     * @override
     */
    destroy: function () {
        this._super.apply(this, arguments);
        $(document).off('mouseleave.open_product');
        clearTimeout(this.timeout);
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _bindProduct: function () {
        const $main = this.$target.find('.modal');

        let display = $main.data('display');
        let delay = $main.data('showAfter');

        if (config.device.isMobile) {
            if (display === 'mouseExit') {
                display = 'afterDelay';
                delay = 5000;
            }
            this.$('.modal').removeClass('s_product_middle').addClass('s_product_bottom');
        }

        if (display === 'afterDelay') {
            this.timeout = setTimeout(() => this._showProduct(), delay);
        } else {
            $(document).on('mouseleave.open_product', () => this._showProduct());
        }
    },
    /**
     * @private
     */
    _hideProduct: function () {
        this.$target.find('.modal').modal('hide');
    },
    /**
     * @private
     */
    _showProduct: function () {
        if (this._productAlreadyShown) {
            return;
        }
        this.$target.find('.modal').modal('show');
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _onCloseClick: function () {
        this._hideProduct();
    },
    /**
     * @private
     */
    _onHideModal: function () {
        const nbDays = this.$el.find('.modal').data('consentsDuration');
        utils.set_cookie(this.$el.attr('id'), true, nbDays * 24 * 60 * 60);
        this._productAlreadyShown = true;
    },
});

publicWidget.registry.product = ProductWidget;

const _baseSetScrollbar = $.fn.modal.Constructor.prototype._setScrollbar;
$.fn.modal.Constructor.prototype._setScrollbar = function () {
    if (this._element.classList.contains('s_product_no_backdrop')) {
        return;
    }
    return _baseSetScrollbar.apply(this, ...arguments);
};
const _baseGetScrollbarWidth = $.fn.modal.Constructor.prototype._getScrollbarWidth;
$.fn.modal.Constructor.prototype._getScrollbarWidth = function () {
    if (this._element.classList.contains('s_product_no_backdrop')) {
        return 0;
    }
    return _baseGetScrollbarWidth.apply(this, ...arguments);
};

return ProductWidget;
});
