import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router"
import { withApollo, compose } from "react-apollo/index"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { withTheme } from "@material-ui/core"

const styles = {
  card: {
    margin: 15,
    // minWidth: 275,
    // maxWidth: 320,
    width: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

const DocumentPreview = ({ document, classes, theme, history, match }) => {
  const bull = <span className={classes.bullet}>•</span>
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          [DOC GEN]
        </Typography>
        <Typography variant="headline" component="h2">
          {document.name}
        </Typography>
        <Typography>{document.createdFor.name}</Typography>
        <Typography className={classes.pos} color="textSecondary">
          <span>
            Author Details:{" "}
            <span>{document.createdBy ? document.createdBy.id : ""}</span>
            <span>{document.createdBy ? document.createdBy.name : ""}</span>
            <span>{document.createdBy ? document.createdBy.email : ""}</span>
          </span>
        </Typography>
        <Typography component="p">
          Each document will have a brief intro explaining what exactly it is
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            history.push(`document/${document.id}`)
          }}>
          Launch Document
        </Button>
      </CardActions>
    </Card>
  )
}

DocumentPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
}

// export default withStyles(styles)(DocumentPreview)

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  withApollo
)(DocumentPreview)
