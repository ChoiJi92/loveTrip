import useHotels from '@/components/hotelList/hooks/useHotels'
import HotelItem from '@/components/hotelList/HotelItem'
import Spacing from '@/components/shared/Spacing'
import Top from '@/components/shared/Top'
import useLike from '@/hooks/like/useLike'
import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const HotelList = () => {
  const { data: hotels, loadMore, hasNextPage } = useHotels()
  const { data: likes, mutate: like } = useLike()
  console.log(likes)
  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가 숙소 예약" />

      <InfiniteScroll
        dataLength={hotels?.length || 0}
        next={loadMore}
        hasMore={hasNextPage}
        loader={<></>}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem
                hotel={hotel}
                isLike={Boolean(
                  likes?.find((like) => like.hotelId === hotel.id),
                )}
                onLike={like}
              />
              {idx !== hotels.length - 1 && (
                <Spacing
                  size={8}
                  backgrounColor={'gray100'}
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default HotelList
