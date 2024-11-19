import useUser from '@/hooks/auth/useUser'
import { getReviews, removeReview, writeReview } from '@/remote/review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useReview = ({ hotelId }: { hotelId: string }) => {
  const user = useUser()
  const client = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews({ hotelId }),
  })

  const { mutateAsync: write } = useMutation({
    mutationFn: async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      }

      await writeReview(newReview)

      return true
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['reviews', hotelId] })
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: ({ reviewId }: { reviewId: string }) => {
      return removeReview({ reviewId, hotelId })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['reviews', hotelId] })
    },
  })

  return { data, isLoading, write, remove }
}

export default useReview
