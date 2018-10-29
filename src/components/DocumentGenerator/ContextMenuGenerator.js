import React, { Fragment } from "react"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  menuItem: {},
})

class ContextMenuGenerator extends React.Component {
  constructor(props) {
    super(props)
  }

  renderChildrenForever = items => {
    const { classes } = this.props
    return (
      <div>
        {items.map((item, itemIdx) => {
          return (
            <div key={itemIdx}>
              {item.component ? (
                item.component
              ) : (
                <MenuItem onClick={() => item.action()}>{item.title}</MenuItem>
              )}

              {item.items && this.renderChildrenForever(item.items)}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { classes, conf } = this.props
    console.log("The context menu generator config => ", conf)
    return (
      <Fragment>
        <div>I am context menu</div>
        {conf.items && this.renderChildrenForever(conf.items)}
      </Fragment>
    )
    // return (
    //   <Fragment>
    //     <div>I am the context menu generator</div>
    //     {conf.items.map((item, itemIdx) => {
    //       return (
    //         <div key={itemIdx} onClick={() => item.action()}>
    //           {/* ToDo: change structiure. It calls its parent div on child click too */}
    //           {item.title}
    //           {item.items && this.renderChildrenForever(item.items)}
    //         </div>
    //       )
    //     })}
    //   </Fragment>
    // )
  }
}

export default withStyles(styles)(ContextMenuGenerator)
