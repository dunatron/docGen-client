import React from "react"
import ActionButton from "../ActionButton"

const DownloadExample = () => {
  return (
    <ActionButton
      text="Download Example"
      color="secondary"
      variant="outlined"
      onClick={() => alert("Download docx file")}
    />
  )
}

export default DownloadExample
