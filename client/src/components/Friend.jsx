import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import FlexBetween from './Flexbetween'
import UserImage from './UserImage'
import { useNavigate } from 'react-router-dom'
import { setFriends } from '../state'
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const navigate = useNavigate()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  const isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const reponse = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await reponse.json()
    dispatch(setFriends({ friends: data }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0)
          }}
        >
          <Typography
            variant='h5'
            color={main}
            fontWeight='500'
            sx={{ '&:hover': { color: palette.primary.light, cursor: 'pointer' } }}
          >
            {name}
          </Typography>
          <Typography fontSize='0.75rem' color={medium}>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend
          ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
            )
          : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
      </IconButton>
    </FlexBetween>
  )
}
export default Friend
