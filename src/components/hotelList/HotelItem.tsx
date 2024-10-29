import { Hotel } from '@/models/hotel'
import ListRow from '../shared/ListRow'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'
import { css } from '@emotion/react'
import addDelimiter from '@/utils/addDelimiter'
import Tag from '../shared/Tag'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import formatTime from '@/utils/formatTime'
import { Link } from 'react-router-dom'

const HotelItem = ({ hotel }: { hotel: Hotel }) => {
  const [remainedTime, setRemainedTime] = useState(0)

  useEffect(() => {
    if (!hotel.events || !hotel.events.promoEndTime) return
    const { promoEndTime } = hotel.events

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )
      if (남은초 < 0) {
        clearInterval(timer)
        return
      }
      setRemainedTime(남은초)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [hotel.events])

  const tagComponent = () => {
    if (!hotel.events) return null

    const { name, tagThemeStyle } = hotel.events
    const { fontColor, backgroundColor } = tagThemeStyle

    const promotionTxt =
      remainedTime > 0 ? `- ${formatTime(remainedTime)} 남음` : ''

    return (
      <div>
        <Tag color={fontColor} backgroundColor={backgroundColor}>
          {name.concat(promotionTxt)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }
  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Text title={hotel.name} subTitle={hotel.comment} />
              <Spacing size={4} />
              <Text typography="t7" color={'gray600'}>
                {hotel.starRating} 성급
              </Text>
            </Flex>
          }
          right={
            <Flex direction="column" align="flex-end">
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={imageStyles}
              />
              <Spacing size={8} />
              <Text bold>{addDelimiter(hotel.price)}원</Text>
            </Flex>
          }
          style={containerStyles}
        />
      </Link>
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`

export default HotelItem