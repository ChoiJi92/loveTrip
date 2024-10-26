import { colors, Colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal'
  backgrounColor?: Colors
}

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical' ? `height: ${size}px;` : `width: ${size}px;`}
  ${({ backgrounColor }) =>
    backgrounColor && `background-color: ${colors[backgrounColor]};`}
`

export default Spacing
