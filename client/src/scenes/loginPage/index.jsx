import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Form from './Form'
const LoginPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery('(min-width: 1000px)')
  const primaryLight = theme.palette.primary.light
  const background = theme.palette.background.default
  const alt = theme.palette.background.alt
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  return (
    <Box>
      <Box width='100%' backgroundColor={alt} p='1rem 6%' textAlign='center'>
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color='primary'
        >
          SocialApp
        </Typography>
      </Box>
      <Box
        width={isMobile ? '50%' : '100%'}
        m='2rem auto'
        p='2rem'
        borderRadius='1.rem'
        backgroundColor={alt}
      >
        <Typography
          fontWeight='500'
          variant='h5'
          sx={{
            mb: '1.5rem'
          }}
        >
          Welcome to SocialApp
        </Typography>
        <Form>

        </Form>
      </Box>
    </Box>
  )
}
export default LoginPage
