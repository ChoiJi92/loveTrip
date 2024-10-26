import { Hotel } from '@/models/hotel'
import getHotels from '@/remote/hotel'
import { useInfiniteQuery } from '@tanstack/react-query'
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { useCallback } from 'react'

interface HotelData {
  items: Hotel[]
  lastVisible: QueryDocumentSnapshot
}

const useHotels = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery<HotelData, Error>({
    queryKey: ['hotels'],
    queryFn: ({ pageParam }) =>
      getHotels(pageParam as QuerySnapshot<Hotel> | undefined),
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
    initialPageParam: undefined,
  })

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const hotels = data?.pages.flatMap(({ items }) => items)

  return { data: hotels, loadMore, isFetching, hasNextPage }
}

export default useHotels
