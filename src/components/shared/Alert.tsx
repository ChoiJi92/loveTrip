import styled from '@emotion/styled'
import Dimmed from './Dimmed'
import { colors } from '../../styles/colorPalette'
import Text from './Text'
import Flex from './Flex'
import Button from './Button'

interface AlertProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick?: () => void
}

function Alert({
  open,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) {
  if (!open) {
    return null
  }

  return (
    <Dimmed>
      <AlertContainer>
        <Text typography="t4" bold display="block" style={{ marginBottom: 6 }}>
          {title}
        </Text>
        {description ? <Text typography="t7">{description}</Text> : null}
        <Flex justify="flex-end">
          <Button
            onClick={onButtonClick}
            weak
            style={{ marginTop: 12, border: 'none' }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </AlertContainer>
    </Dimmed>
  )
}

const AlertContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`

export default Alert
