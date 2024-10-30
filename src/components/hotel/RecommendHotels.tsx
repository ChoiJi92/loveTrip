import { Hotel } from '@/models/hotel'
import useRecommendHotels from './hooks/useRecommendHotels'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'
import ListRow from '../shared/ListRow'
import { css } from '@emotion/react'
import addDelimiter from '@/utils/addDelimiter'
import { useState } from 'react'
import Button from '../shared/Button'

const RecommendHotels = ({
  recommendHotels,
}: {
  recommendHotels: Hotel['recommendHotels']
}) => {
  const { data, isLoading } = useRecommendHotels({ hotelIds: recommendHotels })
  const [showMore, setShowMore] = useState(false)

  if (!data || isLoading) {
    return null
  }

  const 호텔리스트 = data?.length < 3 || showMore ? data : data.slice(0, 3)

  const handleMoreButton = () => {
    setShowMore(!showMore)
  }

  return (
    <div style={{ margin: '24px 0' }}>
      <Text bold typography="t4" style={{ padding: '0 24px' }}>
        추천 호텔
      </Text>
      <Spacing size={16} />
      <ul>
        {호텔리스트?.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={`${hotel.name}의 이미지`}
                css={imageStyles}
              />
            }
            contents={
              <ListRow.Text
                title={hotel.name}
                subTitle={`${addDelimiter(hotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {data.length >= 3 && !showMore && (
        <div style={{ padding: '0 24px', marginTop: 16 }}>
          <Button size="medium" weak full onClick={handleMoreButton}>
            더보기
          </Button>
        </div>
      )}
    </div>
  )
}

const imageStyles = css`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
`

export default RecommendHotels
