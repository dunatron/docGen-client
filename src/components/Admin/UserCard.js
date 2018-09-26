import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

const styles = {
  card: {
    minWidth: 275,
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

const UserCard = ({ user, classes, handleRoleChange }) => {
  const { id, name, email, role } = user

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {id}
        </Typography>
        <Typography variant="headline" component="h2">
          {name}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          {email}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Role:
          {role}
        </Typography>
      </CardContent>
      <CardActions>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={role === "ADMIN"}
                onChange={handleRoleChange}
                aria-label="RoleSwitch"
              />
            }
            label={role}
          />
        </FormGroup>
      </CardActions>
    </Card>
  )
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserCard)
