import { Checkbox, FormControlLabel } from '@mui/material'

export type CheckboxCustomProps = {
  checkedBoolean : boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  labelName: string
}

export const CheckboxCustom = ({
  checkedBoolean,
  onChange,
  labelName
} : CheckboxCustomProps) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={checkedBoolean}
        onChange={onChange}
        sx={{color: "var(--color-marron)", '&.Mui-checked': { color: "var(--color-marron)" }, '& .MuiSvgIcon-root': { fontSize: 22 } }}
      />
    }
    label={<span style={{ fontFamily: "'Baloo Da 2', sans-serif", fontWeight: "bold", fontSize: "1.5rem" }}>{labelName}</span>}
  />
)

export const CheckboxCustomDisabledChecked = ({
 labelName
 } : CheckboxCustomProps) => (
  <FormControlLabel
    control={
      <Checkbox
        sx={{'&.Mui-checked': { color: "grey" }, '& .MuiSvgIcon-root': { fontSize: 22 } }}
        disabled checked
      />
    }
    label={<span style={{ color: "#545454", fontFamily: "'Baloo Da 2', sans-serif", fontWeight: "bold", fontSize: "1.5rem" }}>{labelName}</span>}
  />
)