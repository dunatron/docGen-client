import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

/**
 * API: https://material-ui.com/api/typography/
 */
const TypographySheet = ({ classes, config, ...props }) => {
  console.log("The config ", config)

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {config &&
          config.map((conf, confIdx) => {
            console.log("A conf => ", conf)
            return (
              <Typography
                key={confIdx}
                variant={conf.variant}
                component={conf.type}
                {...props}>
                {conf.value}
              </Typography>
            )
          })}
      </Paper>
    </div>
  )
}

export default withStyles(styles)(TypographySheet)
