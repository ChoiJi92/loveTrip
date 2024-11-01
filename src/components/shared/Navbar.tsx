import { Link, useLocation } from 'react-router-dom'
import Flex from './Flex'
import Button from './Button'
import { css } from '@emotion/react'
import { colors } from '@/styles/colorPalette'
import { useCallback } from 'react'
import useUser from '@/hooks/auth/useUser'

const Navbar = () => {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user !== null) {
      return (
        <Link to={'/my'}>
          <img
            src={
              user.photoURL ??
              'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
            }
            alt="유저의 이미지"
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
        </Link>
      )
    }
    if (showSignButton) {
      return (
        <Link to={'/signin'}>
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }
    return null
  }, [user, showSignButton])
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to={'/'}>Love Trip</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray};
  z-index: 10;
`

export default Navbar
