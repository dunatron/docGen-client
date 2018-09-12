import React, { Fragment } from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table/Table"
import TableBody from "@material-ui/core/TableBody/TableBody"
import TableCell from "@material-ui/core/TableCell/TableCell"
import TableHead from "@material-ui/core/TableHead/TableHead"
import TablePagination from "@material-ui/core/TablePagination/TablePagination"
import TableRow from "@material-ui/core/TableRow/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import DeleteIcon from "@material-ui/icons/Delete"
import FilterListIcon from "@material-ui/icons/FilterList"
import { lighten } from "@material-ui/core/styles/colorManipulator"
import DialogPopup from "./DialogPopup"
import CheckBoxSelection from "./inputs/CheckBoxSelection"
import SearchFilter from "./inputs/SearchFilter"
import SelectOption from "./inputs/SelectOption"
import MultiSelect from "./inputs/MultiSelect"

let counter = 0

function createData({ description }) {
  counter += 1
  return { id: counter, description }
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columnHeaders,
    } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnHeaders.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}>
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
})

const FilterBar = props => {
  return (
    <div>
      <CheckBoxSelection
        options={props.columnHeaders}
        handleOptionChange={optionObj => {
          props.updateShowProp(optionObj)
        }}
      />
      <MultiSelect
        values={props.columnHeaders
          .filter(header => header.show === true)
          .map(h => {
            return h.id
          })}
        selectID="ooo"
        label={"Always apply the stuff"}
        options={props.columnHeaders.map(header => {
          return {
            name: header.label,
            value: header.id,
          }
        })}
        handleChange={values => props.updateShowValues(values)}
        // handleChange={values => props.updateShowValues(values)}
      />
      <SelectOption
        label="Column Filter"
        value={props.searchCol}
        selectID={"SearchFilter"}
        handleChange={selected => props.updateSearchCol(selected)}
        options={props.columnHeaders.map((header, hIdx) => {
          return {
            name: header.label,
            value: header.id,
          }
        })}
      />
      <SearchFilter
        value={props.searchValue}
        handleChange={val => props.updateSearch(val)}
      />
    </div>
  )
}

let EnhancedTableToolbar = props => {
  const {
    numSelected,
    classes,
    columnHeaders,
    title,
    searchValue,
    searchCol,
    updateSearchCol,
    updateShowValues,
  } = props

  return (
    <div>
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              {title}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
      <Toolbar>
        <FilterBar
          columnHeaders={columnHeaders}
          searchCol={searchCol}
          updateSearchCol={selected => updateSearchCol(selected)}
          searchValue={searchValue}
          updateShowValues={values => updateShowValues(values)}
          updateSearch={val => props.updateSearch(val)}
          updateShowProp={prop => props.updateShowProp(prop)}
        />
      </Toolbar>
    </div>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
}

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    // minWidth: 1020,
    minWidth: "100%",
  },
  tableWrapper: {
    overflowX: "auto",
  },
})

const extractDeepValue = (str, dataObj) => {
  // cellHeader.found
  //                                     .split(".")
  //                                     .reduce((o, i) => o[i], n)

  const value = str.split(".").reduce((o, i) => o[i], dataObj)

  return value ? value : ""
}

const CellContent = ({ content, limitChar }) => {
  if (limitChar) {
    const trimmedString =
      content.length > limitChar ? (
        <div>
          {content.substring(0, limitChar - 3)}
          <DialogPopup text={"..."} content={content} />
        </div>
      ) : (
        content
      )
    return trimmedString
  }

  return content
}

class SuperTable extends React.Component {
  constructor(props) {
    super(props)

    const propColumnHeaders = this.props.columnHeaders

    const propData = this.props.data.map(note => createData(note))
    const displayColumns = propColumnHeaders.reduce(
      (ac, column) => ({ ...ac, [column.id]: column.show }),
      {}
    )

    this.state = {
      order: "asc",
      orderBy: "calories",
      selected: [],
      searchCol: "",
      withSearch: true,
      searchValue: "",
      filterProps: [...displayColumns], // Ok when we click on filter Icon the FilterBar will update the state here
      stateData: propData,
      columnHeaders: propColumnHeaders,
      page: 0,
      rowsPerPage: 5,
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.stateData.map(n => n.id) }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    this.setState({ selected: newSelected })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  updateShowProp = prop => {
    const objectKey = Object.keys(prop).map(key => key)[0]
    const objectValue = Object.values(prop).map(val => val)[0]
    let columnHeaders = this.state.columnHeaders
    const headerIndex = columnHeaders.findIndex(function(c) {
      return c.id === objectKey
    })
    let columnHeaderData = columnHeaders[headerIndex]
    columnHeaderData.show = objectValue
    columnHeaders.splice(headerIndex, 1, columnHeaderData)
    this.setState({
      columnHeaders: columnHeaders,
    })
  }

  updateShowValues = values => {
    const columnHeaders = this.state.columnHeaders

    const updated = columnHeaders.map(header => {
      return {
        ...header,
        show: values.includes(header.id),
      }
    })
    this.setState({
      columnHeaders: updated,
    })
  }

  updateSearch = val => {
    this.setState({
      searchValue: val,
    })
  }

  updateSearchCol = col => {
    this.setState({
      searchCol: col,
    })
  }

  filterData = (data, searchCol, searchVal) => {
    const filteredData = data.filter(n =>
      n[searchCol].toLowerCase().includes(searchVal.toLowerCase())
    )
    return filteredData
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes, title, data } = this.props
    const {
      stateData,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      searchCol,
      searchValue,
    } = this.state
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, stateData.length - page * rowsPerPage)

    let processedData =
      searchValue.length > 2 && searchCol.length > 2
        ? this.filterData(data, searchCol, searchValue)
        : data

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          columnHeaders={this.state.columnHeaders}
          searchCol={this.state.searchCol}
          updateSearchCol={selected => this.updateSearchCol(selected)}
          searchValue={this.state.searchValue}
          updateSearch={val => this.updateSearch(val)}
          updateShowProp={prop => this.updateShowProp(prop)}
          updateShowValues={values => this.updateShowValues(values)}
        />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              columnHeaders={this.state.columnHeaders.filter(
                header => header.show === true
              )}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={stateData.length}
            />
            <TableBody>
              {processedData &&
                processedData
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id)
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            color="primary"
                            onClick={event => this.handleClick(event, n.id)}
                          />
                        </TableCell>
                        {this.state.columnHeaders
                          .filter(header => header.show === true)
                          .map((cellHeader, idx) => {
                            if (cellHeader.type === "btnFunc") {
                              return (
                                <TableCell
                                  key={idx}
                                  numeric={cellHeader.numeric}
                                  style={{ minWidth: "90px" }}
                                  component={cellHeader.tableRenderKey}
                                  padding={idx === 0 ? "dense" : "dense"}
                                  {...cellHeader.tableRenderProps}>
                                  <div
                                    onClick={() =>
                                      this.props.executeFunc(
                                        cellHeader.funcName,
                                        n
                                      )
                                    }>
                                    BUTTON
                                    {cellHeader.icon}
                                  </div>
                                </TableCell>
                              )
                            }
                            if (cellHeader.type === "btn") {
                              return (
                                <div>
                                  BUTTON
                                  {cellHeader.icon}
                                </div>
                              )
                            }

                            if (cellHeader.type === "numberOfObj") {
                              //1. use const to extract deep value
                              // just get the number of items
                              const length = extractDeepValue(
                                cellHeader.found,
                                n
                              ).length
                              console.log("The length ", length)
                              return (
                                <TableCell
                                  key={idx}
                                  numeric={cellHeader.numeric}
                                  style={{ minWidth: "90px" }}
                                  component={cellHeader.tableRenderKey}
                                  padding={idx === 0 ? "dense" : "dense"}
                                  {...cellHeader.tableRenderProps}>
                                  <CellContent
                                    content={length}
                                    limitChar={cellHeader.limitChar}
                                  />
                                </TableCell>
                              )
                            }

                            if (cellHeader.type === "deep") {
                              return (
                                <TableCell
                                  key={idx}
                                  numeric={cellHeader.numeric}
                                  style={{ minWidth: "90px" }}
                                  component={cellHeader.tableRenderKey}
                                  padding={idx === 0 ? "dense" : "dense"}
                                  {...cellHeader.tableRenderProps}>
                                  {/* <CellContent
                                    content={cellHeader.found
                                      .split(".")
                                      .reduce((o, i) => o[i], n)}
                                    limitChar={cellHeader.limitChar}
                                  /> */}

                                  <CellContent
                                    content={extractDeepValue(
                                      cellHeader.found,
                                      n
                                    )}
                                    limitChar={cellHeader.limitChar}
                                  />
                                </TableCell>
                              )
                            }
                            return (
                              <TableCell
                                key={idx}
                                numeric={cellHeader.numeric}
                                style={{ minWidth: "90px" }}
                                component={cellHeader.tableRenderKey}
                                padding={idx === 0 ? "dense" : "dense"}
                                {...cellHeader.tableRenderProps}>
                                <CellContent
                                  content={n[cellHeader.id]}
                                  limitChar={cellHeader.limitChar}
                                />
                              </TableCell>
                            )
                          })}
                      </TableRow>
                    )
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

SuperTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SuperTable)
