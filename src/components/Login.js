import React, { Component, Fragment } from "react"
import { AUTH_TOKEN } from "../constants"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { withRouter } from "react-router"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "react-apollo/index"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const styles = theme => ({
  container: {
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "320px",
    padding: `${theme.spacing.unit * 3}px`,
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    color: theme.palette.primary.main,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
  },
})
class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: "",
  }

  render() {
    const { login, email, password, name } = this.state
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>{login ? "Login" : "Sign Up"}</h1>
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => this._confirm(data)}>
          {(mutation, { loading, error, data }) => (
            <Fragment>
              {error ? "Something went wrong please try again" : null}
              {loading ? "LOADING" : null}
              {!loading && (
                <form
                  className={classes.form}
                  noValidate
                  autoComplete="off"
                  onSubmit={mutation}>
                  {!login && (
                    <TextField
                      id="name"
                      label="Name"
                      className={classes.textField}
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                      margin="normal"
                    />
                  )}
                  <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={email}
                    onChange={e => this.setState({ email: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    className={classes.textField}
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                    margin="normal"
                  />
                  <div className={classes.actions}>
                    <Button
                      variant="contained"
                      onClick={mutation}
                      color="primary"
                      className={classes.button}>
                      {login ? "login" : "create account"}
                    </Button>

                    <Button
                      // variant="contained"
                      color="secondary"
                      onClick={() => this.setState({ login: !login })}
                      className={classes.button}>
                      {login
                        ? "need to create an account?"
                        : "already have an account?"}
                    </Button>
                  </div>
                </form>
              )}
            </Fragment>
          )}
        </Mutation>
      </div>
    )
  }

  _confirm = async data => {
    console.log("Our data ")
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem("jwt", token)
  }
}

// export default Login

export default withRouter(compose(withStyles(styles))(Login))
