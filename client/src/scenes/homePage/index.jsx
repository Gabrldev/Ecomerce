import Navbar from '../navbar'
import { Box, useMediaQuery } from '@mui/material'
import UserWidget from '../widget/UserWidget'
import { useSelector } from 'react-redux'
import MyPostsWidget from '../widget/MyPostsWidget'
import PostsWidget from '../widget/PostsWidget'

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user)
  const isMobile = useMediaQuery('(min-width:1000px)')
  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isMobile ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isMobile ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isMobile ? '42%' : undefined}
          mt={isMobile ? undefined : '2rem'}
        >
          <MyPostsWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />

        </Box>
      </Box>
    </Box>
  )
}
export default HomePage
