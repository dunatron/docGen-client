import React from "react"
import ActionButton from "../ActionButton"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
//Icons
import SettingsInputIcon from "@material-ui/icons/SettingsInputComponentSharp"
import CloseSharpIcon from "@material-ui/icons/CloseSharp"
//Utils
import filesize from "filesize"

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

const LoadedDocumentDetails = ({
  classes,
  document,
  processDocument,
  remove,
  injectStyles,
}) => {
  if (!document) {
    return null
  }

  const { size, name, lastModified, type } = document

  return (
    <Paper
      style={{ position: "relative", ...injectStyles }}
      square={true}
      className={classes.root}
      elevation={1}>
      <ActionButton
        text={<CloseSharpIcon />}
        injectStyles={{ position: "absolute", top: 0, right: 0 }}
        mini={true}
        color="primary"
        variant="fab"
        onClick={remove}
      />
      <p>Name: {name}</p>
      <p>Size: {filesize(size)}</p>

      <p>
        edited Last
        {lastModified}
      </p>
      <p>
        Document Type
        {type}
      </p>

      <ActionButton
        text={<SettingsInputIcon />}
        mini={false}
        color="secondary"
        variant="fab"
        onClick={processDocument}
      />
    </Paper>
  )
}

export default withStyles(styles)(LoadedDocumentDetails)
