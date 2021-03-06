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
  return (
    <div>
      <Paper square={true} className={classes.root} elevation={20}>
        {config &&
          config.map((conf, confIdx) => {
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
