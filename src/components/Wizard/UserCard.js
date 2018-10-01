import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Droppable } from "react-beautiful-dnd"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Chip from "@material-ui/core/Chip"
import FaceIcon from "@material-ui/icons/Face"

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

const UserCard = ({ user, classes, handleRoleChange, removeOrg }) => {
  const { id, name, email, role, organisations } = user

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
        {role === "WIZARD" && (
          <Typography className={classes.pos} color="textSecondary">
            {`This man is a ${role} you cannot alter him`}
          </Typography>
        )}
        {/* {Organisations here is going to be a drag and rop context =)} */}
        <Droppable droppableId={id} type="ORG">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
              }}
              {...provided.droppableProps}>
              <h2>I am a droppable!</h2>
              {provided.placeholder}
              {organisations &&
                organisations.map((org, orgIdx) => {
                  return (
                    <Chip
                      key={orgIdx}
                      icon={<FaceIcon />}
                      label={org.name}
                      onDelete={() => removeOrg(org.id)}
                      className={classes.chip}
                      color="secondary"
                      variant="outlined"
                    />
                  )
                })}
            </div>
          )}
        </Droppable>
      </CardContent>
      <CardActions>
        <FormGroup>
          {role !== "WIZARD" && (
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
          )}
        </FormGroup>
      </CardActions>
    </Card>
  )
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserCard)
