import { TextField } from '@mui/material'

const estiloInput = {
  "& .MuiInputBase-input": {
    fontSize: "1.5rem",
    padding: "12px 14px",
    fontFamily: "'Baloo Da 2', sans-serif"
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.25rem",
    transform: "translate(14px, 16px) scale(1)",
    fontFamily: "'Baloo Da 2', sans-serif",
  },
  "& .MuiInputLabel-shrink": {
    fontSize: "1.35rem",
    transform: "translate(14px, -7px) scale(0.75)",
    fontWeight: "bold",
    fontFamily: "'Baloo Da 2', sans-serif"
  },
  "& .MuiOutlinedInput-notchedOutline": {
    paddingLeft: "12px",
  },

  width: '100%',
  paddingBottom: 0,
  marginTop: 0,
}



import { TextFieldProps } from '@mui/material';

export type CustomTextFieldProps = {
  label: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type: 'string' | 'number'
} & Omit<TextFieldProps, 'type'>


export const CustomTextField = ({
   label,
   value,
   onChange,
   type = 'string',
   fullWidth = true,
   variant = "outlined",
   required = false,
   error = false,
   helperText = "",
   ...rest
  }: CustomTextFieldProps) => {
  return (
    <TextField
      label={label}
      variant={variant}
      value={value}
      type={type}
      onChange={onChange}
      fullWidth={fullWidth}
      sx={estiloInput}
      required={required}
      error={error}
      helperText={helperText}
      {...rest}
    />
  )
}
