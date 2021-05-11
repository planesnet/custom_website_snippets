# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class custom_website_snippets(models.Model):
#     _name = 'custom_website_snippets.custom_website_snippets'
#     _description = 'custom_website_snippets.custom_website_snippets'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
