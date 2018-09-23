import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  card: {
    minWidth: 275,
    borderRadius: 0,
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1,

    // flexGrow: 1,
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
})

const BasicPanel = ({
  classes,
  theme,
  handleClick,
  title,
  btnTitle,
  content,
  active,
}) => {
  return (
    <Card
      className={classes.card}
      style={active ? { backgroundColor: theme.palette.secondary.main } : {}}>
      <CardContent>
        {title && (
          <Typography className={classes.title} color="textSecondary">
            {title}
          </Typography>
        )}
        {content && (
          <Typography className={classes.title} color="textSecondary">
            {content}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {btnTitle && (
          <Button size="small" onClick={handleClick} color={"primary"}>
            {btnTitle}
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

BasicPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(BasicPanel)
