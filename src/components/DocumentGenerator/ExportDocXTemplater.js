import React, { Component, Fragment } from "react"
import { saveAs } from "file-saver/FileSaver"

class ExportDocXTemplater extends Component {
  generate = document => {}

  // Step 1 upload the file.
  loadFile = (url, callback) => {
    JSZipUtils.getBinaryContent(url, callback)
  }

  // Step 2 convert the file
  loadFile = ("examples/tag-example.docx",function(error,content) => {
    if (error) { throw error };
    var zip = new JSZip(content);
    var doc=new Docxtemplater().loadZip(zip)
    doc.setData({
        first_name: 'John',
        last_name: 'Doe',
        phone: '0652455478',
        description: 'New Website'
    });

    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    var out=doc.getZip().generate({
        type:"blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }) //Output the document using Data-URI
    saveAs(out,"output.docx")
}

  render() {
    const { document } = this.props
    return (
      <Fragment>
        <button type="button" onClick={() => this.generate(document)}>
          Export to Word Document
        </button>
      </Fragment>
    )
  }
}

export default ExportDocXTemplater
