# -*- coding: utf-8 -*-
# from odoo import http


# class CustomWebsiteSnippets(http.Controller):
#     @http.route('/custom_website_snippets/custom_website_snippets/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/custom_website_snippets/custom_website_snippets/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('custom_website_snippets.listing', {
#             'root': '/custom_website_snippets/custom_website_snippets',
#             'objects': http.request.env['custom_website_snippets.custom_website_snippets'].search([]),
#         })

#     @http.route('/custom_website_snippets/custom_website_snippets/objects/<model("custom_website_snippets.custom_website_snippets"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('custom_website_snippets.object', {
#             'object': obj
#         })
