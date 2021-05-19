odoo.define('custom_website_snippets.s_dynamic_snippet_table_product_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');
    const s_dynamic_snippet_carousel_options = require('website.s_dynamic_snippet_carousel_options');
    console.log("entrando en options.js");
    const dynamicSnippetProductsOptions = s_dynamic_snippet_carousel_options.extend({

        /**
         *
         * @override
         */
        init: function () {
            this._super.apply(this, arguments);
            this.productData = {};
        },
        /**
         *
         * @override
         */
        onBuilt: function () {
            this._super.apply(this, arguments);
            this._rpc({
                route: '/website_sale/snippet/options_filters'
            }).then((data) => {
                if (data.length) {
                    this.$target.get(0).dataset.filterId = data[0].id;
                    this.$target.get(0).dataset.numberOfRecords = this.dynamicFilters[data[0].id].limit;
                    this._refreshPublicWidgets();
                    // Refresh is needed because default values are obtained after start()
                }
            });
        },

        //--------------------------------------------------------------------------
        // Private
        //--------------------------------------------------------------------------

        /**
         *
         * @override
         * @private
         */
        _computeWidgetVisibility: function (widgetName, params) {
            if (widgetName === 'filter_opt') {
                return false;
            }
            return this._super.apply(this, arguments);
        },
        /**
         * Fetches product categories.
         * @private
         * @returns {Promise}
         */
        _fetchProductData: function () {
            console.log("Hello world!");
            return this._rpc({
                model: 'product.template',
                method: 'search_read',
                kwargs: {
                    domain: [],
                    fields: ['id', 'name'],
                }
                
            });
            
        },


        /**
         *
         * @override
         * @private
         */
        _renderCustomXML: async function (uiFragment) {
            await this._super.apply(this, arguments);
            await this._renderProductDatasSelector(uiFragment);
        },
        /**
         * Renders the product categories option selector content into the provided uiFragment.
         * @private
         * @param {HTMLElement} uiFragment
         */
        _renderProductDatasSelector: async function (uiFragment) {
            console.log("id ");
            const productData = await this._fetchProductData();
            for (let index in productData) {
                this.productData[productData[index].id] = productData[index];
            }
            const productDataSelectorEl = uiFragment.querySelector('[data-name="productId"]');
            return this._renderSelectUserValueWidgetButtons(productDataSelectorEl, this.productData);
        },
        /**
         * Sets default options values.
         * @override
         * @private
         */
        _setOptionsDefaultValues: function () {
            this._super.apply(this, arguments);
            const templateKeys = this.$el.find("we-select[data-attribute-name='templateKey'] we-selection-items we-button");
            if (templateKeys.length > 0) {
                this._setOptionValue('templateKey', templateKeys.attr('data-select-data-attribute'));
            }
            const productData = this.$el.find("we-select[data-attribute-name='productId'] we-selection-items we-button");
            if (productData.length > 0) {
                this._setOptionValue('productId', productData.attr('data-select-data-attribute'));
            }
        },

    });

    options.registry.dynamic_snippet_table_products = dynamicSnippetProductsOptions;

    return dynamicSnippetProductsOptions;
});