import FileSaver from "file-saver"

export function saveDocyFile(content, fileName) {
  const blob = new Blob([content], {
    type:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  })
  FileSaver.saveAs(blob, `${fileName}.docx`)
}
