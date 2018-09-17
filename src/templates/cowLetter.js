/**
 * - name
 * - company
 * - address1
 * - address2
 * - city
 * - country
 * client: {
 *  - name
 * }
 * - siteLocation
 */

const template = `"{{#agreements}}
 <b>{{name}},</b>
{{/agreements}} Company Name: {{company}}"`

export default template
