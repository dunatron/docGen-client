import React from "react"
import PropTypes from "prop-types"
import compose from "recompose/compose"
import withState from "recompose/withState"

import TextField from "@material-ui/core/TextField"

import { DEFAULT_CONVERTER, converters } from "../transformers"
import PickerDialog from "./PickerDialog"
// http://casesandberg.github.io/react-color/

const ColorPicker = ({
  // ColorPicker
  defaultValue,
  onChange,
  convert,

  // Text field
  name,
  id,
  hintText,
  placeholder,
  floatingLabelText,
  label,
  TextFieldProps,

  // State
  showPicker,
  setShowPicker,
  value,
  setValue,
  setColor,
  icon,
}) => (
  <div>
    {icon && icon}
    <TextField
      name={name}
      id={id}
      value={value}
      label={floatingLabelText || label}
      placeholder={hintText || placeholder}
      onClick={() => setShowPicker(true)}
      onChange={e => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      InputProps={{ style: { color: value } }}
      {...TextFieldProps}
    />
    {showPicker && (
      <PickerDialog
        value={value}
        setInDB={() => setColor(value)}
        onClick={() => {
          setShowPicker(false)
          // onChange(value)
        }}
        onChange={c => {
          console.log("A change => ", c)
          const newValue = converters[convert](c)
          setValue(newValue)
          // onChange(newValue)
        }}
      />
    )}
  </div>
)

ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  convert: PropTypes.oneOf(Object.keys(converters)),
}

ColorPicker.defaultProps = {
  convert: DEFAULT_CONVERTER,
}

const makeColorPicker = compose(
  withState("showPicker", "setShowPicker", false),
  withState("value", "setValue", ({ defaultValue }) => defaultValue)
)

export default makeColorPicker(ColorPicker)
