import React, { Component } from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import TextInput from "./inputs/TextInput"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({})

class CreateDataConfig extends Component {
  state = {
    name: null,
    confData: { name: "test", date: "21/03/1997" },
  }

  handleTextChange = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  createConfig = () => {
    const { name, confData } = this.state
    const confObj = {
      name,
      confData,
    }

    this.props.createConfig(confObj)
  }

  render() {
    const { classes } = this.props
    const { id, name, confData } = this.state

    return (
      <div>
        <div>
          <TextField
            label="Config Name"
            value={name}
            onChange={e => this.handleTextChange("name", e.target.value)}
          />
          <div onClick={() => this.createConfig()}>CREATE CONFIG</div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CreateDataConfig)
