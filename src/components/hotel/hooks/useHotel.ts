import { getHotel } from '@/remote/hotel'
import { useQuery } from '@tanstack/react-query'

export const useHotel = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotel(id),
  })
}
