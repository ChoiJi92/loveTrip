import useHotels from '@/components/hotelList/hooks/useHotels'
import Hotel from '@/components/hotelList/Hotel'
import Spacing from '@/components/shared/Spacing'
import Top from '@/components/shared/Top'
import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const HotelList = () => {
  const { data: hotels, isFetching, loadMore, hasNextPage } = useHotels()
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
              <Hotel hotel={hotel} />
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
