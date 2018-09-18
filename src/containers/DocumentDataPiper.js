import React, { Component, Fragment } from "react"
import { withRouter } from "react-router"
import { graphql, compose, withApollo } from "react-apollo"
// Components
import DnDFileReader from "../components/DnDFileReader"
import { saveAs } from "file-saver"
import { Event } from "@material-ui/icons"
const JSZipUtils = require("jszip-utils")
// var JSZip = require("jszip")
// var Docxtemplater = require("docxtemplater")

var JSZip = require("jszip")
var Docxtemplater = require("docxtemplater")

/**
 * READ THIS
 * https://github.com/Stuk/jszip/issues/403
 * https://stuk.github.io/jszip/documentation/examples/read-local-file-)api.html
 */

class DocumentDataPiper extends Component {
  // _processWordDocument = async document => {
  //   JSZipUtils.getBinaryContent(document, function(err, data) {
  //     if (err) {
  //       throw err // or handle err
  //     }
  //     var zip = new JSZip()
  //     zip.file("file.docx", data)
  //   })
  // }

  _processWordDocument = async file => {
    const { size, name, lastModified, type } = file

    let rawData
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    // Load and process the file as an arry buffer
    reader.onload = () => {
      let data = reader.result
      rawData = data
    }

    // when we have loaded it begin converting it to what docXtemplater needs
    reader.onloadend = () => {
      var zip = new JSZip(rawData)
      var doc = new Docxtemplater()
      doc.loadZip(zip)

      const documentData = this._fetchDocumentData()

      doc.setData(documentData)

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
      } catch (error) {
        var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        }
        console.log(JSON.stringify({ error: e }))
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error
      }

      const newDocument = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })

      console.log("Original documengt Name => ", name)
      saveAs(newDocument, "output.docx")
    }
  }

  _fetchDocumentData = () => {
    return {
      name: "John",
      company: "Doe",
      address1: "0652455478",
      address2: "New Website",
      city: "Dunedin",
      country: "New Zealand",
      sparkName: "Spark Company is Shit",
      clientName: "Jonny Mirkin",
      content: `Howdy do motherfuckas, it's Weezy Baby
      Niggas bitchin' and I gotta tote the (Cannon)
      Listen close, I got duct tape and rope
      I leave you missing like the fucking O'bannons
      One hand on my money, one hand on my buddy
      That's the AK-47, make his neighborhood love me
      Bullets like birds, you can hear them bitches humming
      Don't make that bird shit, he got a weak stomach
      Niggas know I'm sick, I don't spit, I vomit, got it?
      One egg short of the omelet
      Simon says: "shoot a nigga in his thigh and leg"
      And tell him "catch up" like mayonnaise
      Um, I'm the sickest nigga doing it, bet that baby
      These other niggas dope, I'm wet crack baby
      Yes, get back, get back boy, this a setback
      Clumsy ass niggas slip and fall into a death trap
      Them boys pussy, born without a backbone
      And if you strapped we can trade like the Dow Jones
      Wet em up, I hope he got his towel on
      I aim at your moon and get my howl on
      Some niggas cry wolf, I'm on that dry kush
      And when it come to that paper I stack books
      You heard what I said
      I can put you on your feet or put some money on ya head
      Life ain't cheap, you better off dead if you can't pay the fee
      Shout out my nigga Fee
      See every motherfucka at the door don't get a key
      You're outside looking in, so tell me what you see
      It's about money, it's bigger than me
      I tell my homies: "don't kill him, bring the nigga to me"
      Yeah, don't miss, you fucking with the hitman
      Kidnap a nigga, make him feel like a kid again`,
      author: "Dunatron",
      authorJobTitle: "Developer",
      events: [
        {
          name: "The First Event",
          date: "21/03/1966"
        },
        {
          name: "The Second Event",
          date: "24/03/1966"
        },
      ]
    }
  }

  render() {
    return (
      <div>
        <DnDFileReader
          // processWordDoc={document => this._processWordDocument(document)}
          processWordDoc={document => this._processWordDocument(document)}
        />
        You can drop documents into here and they will be replaced data
      </div>
    )
  }
}

export default compose(
  withRouter,
  withApollo
)(DocumentDataPiper)
