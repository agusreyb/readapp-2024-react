import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export const BtnFlotanteMas = ({ url }: { url: string}) => {         

  const navigate = useNavigate()

  const goToURL = () => {
    navigate(url)
  }

 return(

  <Fab
    onClick={goToURL}
    color="primary"
    aria-label="add"
    sx={{
      position: 'sticky',
      bottom: 50,
      left: 300,
      borderRadius: '12px',
      backgroundColor: 'var(--color-marron)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'var(--color-beige-mas-claro)',
        color: 'black',
      },
    }}
  >
    <AddIcon sx={{ width: '30px', height: '30px' }}></AddIcon>
  </Fab>
 )
  
}