odoo.define('custom_website_snippets.s_dynamic_snippet_table_product', function (require) {
'use strict';

const config = require('web.config');
const core = require('web.core');
const publicWidget = require('web.public.widget');
const DynamicSnippetCarousel = require('website.s_dynamic_snippet_carousel');

const DynamicSnippetProducts = DynamicSnippetCarousel.extend({
    selector: '.s_dynamic_snippet_table_product',

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * Method to be overridden in child components if additional configuration elements
     * are required in order to fetch data.
     * @override
     * @private
     */
    _isConfigComplete: function () {
        return this._super.apply(this, arguments) && this.$el.get(0).dataset.id !== undefined;
    },
    /**
     *
     * @override
     * @private
     */
    _mustMessageWarningBeHidden: function() {
        const isInitialDrop = this.$el.get(0).dataset.templateKey === undefined;
        // This snippet has default values obtained after the initial start and render after drop.
        // Because of this there is an initial refresh happening right after.
        // We want to avoid showing the incomplete config message before this refresh.
        // Since the refreshed call will always happen with a defined templateKey,
        // if it is not set yet, we know it is the drop call and we can avoid showing the message.
        return isInitialDrop || this._super.apply(this, arguments);
    },
    /**
     * Method to be overridden in child components in order to provide a search
     * domain if needed.
     * @override
     * @private
     */
    _getSearchDomain: function () {
        const searchDomain = this._super.apply(this, arguments);
        const id = parseInt(this.$el.get(0).dataset.id);
        if (id >= 0) {
            searchDomain.push(['public_ids', 'child_of', id]);
        }
        return searchDomain;
    },

});
publicWidget.registry.dynamic_snippet_products = DynamicSnippetProducts;

return DynamicSnippetProducts;
});
