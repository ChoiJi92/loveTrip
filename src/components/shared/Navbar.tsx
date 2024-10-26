import { Link, useLocation } from 'react-router-dom'
import Flex from './Flex'
import Button from './Button'
import { css } from '@emotion/react'
import { colors } from '@/styles/colorPalette'
import { useCallback } from 'react'

const Navbar = () => {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  const user = null

  const renderButton = useCallback(() => {
    if (user !== null) {
      return (
        <Link to={'/my'}>
          <img src="" alt="" />
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
      <Link to={'/'}>홈</Link>
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
