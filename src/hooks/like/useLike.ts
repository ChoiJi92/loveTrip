import { getLikes, toggleLike } from '@/remote/like'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useUser from '../auth/useUser'
import { Hotel } from '@/models/hotel'
import { useAlertContext } from '@/contexts/AlertContext'
import { useNavigate } from 'react-router-dom'

const useLike = () => {
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['likes'],
    queryFn: () => getLikes({ userId: user?.uid as string }),
    enabled: !!user,
  })

  const { mutate } = useMutation({
    mutationFn: ({
      hotel,
    }: {
      hotel: Pick<Hotel, 'id' | 'name' | 'mainImageUrl'>
    }) => {
      if (user == null) {
        throw new Error('로그인 필요')
      }

      return toggleLike({ hotel, userId: user.uid })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
    onError: (error: Error) => {
      if (error.message === '로그인 필요') {
        open({
          title: '로그인이 필요한 기능입니다',
          onButtonClick: () => {
            navigate('/signin')
          },
        })
        return
      }

      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요',
        onButtonClick: () => {
          // 다른 액션
        },
      })
    },
  })

  return { data, mutate }
}

export default useLike
