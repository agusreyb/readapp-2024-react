import CircularProgress from '@mui/material/CircularProgress'

export const CircularProgressCustom = () => (
  <CircularProgress
    color="primary"
    aria-label="Cargando..."
    size={60}
    thickness={4.5}
    sx={{
      color: 'var(--color-marron)'
    }}
  ></CircularProgress>
)