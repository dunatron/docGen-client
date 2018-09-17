/**
 * - companyDetails: {
 *    - name
 *    - streetAddress
 *    - postalAddress
 *    - telephone
 *    - contactPerson
 * }
 * - licensorDetails: {
 *    - name
 *    - streetAddress
 *    - postalAddress
 *    - telephone
 *    - mobile
 *    - email
 * }
 */

// const template = `"{{#agreements}}
//  <b>{{name}},</b>
// {{/agreements}} Company Name: {{company}}"`

const template = `
"
<h1>Parties</h1>
<div><h2>Sparks Details</h2></div>
<div>Name: {{companyDetails.name}}</div>
<div>Street Address: {{companyDetails.streetAddress}}</div>
<div>Postal Address: {{companyDetails.postalAddress}}</div>
<div>Telephone: {{companyDetails.telephone}}</div>
<div>Contact Person: {{companyDetails.contactPerson}}</div>
"
`

export default template
