import { useCallback, useState } from 'react'
import useReview from './hooks/useReview'
import Text from '../shared/Text'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import ListRow from '../shared/ListRow'
import { format } from 'date-fns'
import Button from '../shared/Button'
import useUser from '@/hooks/auth/useUser'
import TextField from '../shared/TextField'

const Review = ({ hotelId }: { hotelId: string }) => {
  const { data: reviews, isLoading, write, remove } = useReview({ hotelId })
  const [text, setText] = useState('')
  const user = useUser()

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/message_open-64.png"
            alt=""
          />
          <Spacing size={10} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
          </Text>
        </Flex>
      )
    }

    return (
      <ul>
        {reviews?.map((review) => {
          return (
            <ListRow
              key={review.id}
              left={
                review.user.photoURL ? (
                  <img
                    src={review.user.photoURL}
                    alt={`${review.user.displayName} 이미지`}
                    width={40}
                    height={40}
                  />
                ) : null
              }
              contents={
                <ListRow.Text
                  title={review.text}
                  subTitle={format(review.createdAt, 'yyyy-MM-dd')}
                />
              }
              right={
                review.userId === user?.uid ? (
                  <Button
                    onClick={() => {
                      remove({ reviewId: review.id })
                    }}
                  >
                    삭제
                  </Button>
                ) : null
              }
            />
          )
        })}
      </ul>
    )
  }, [reviews, user, remove])

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
    },
    [],
  )

  if (isLoading) return null

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user && (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleTextChange} />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button
              disabled={!text}
              onClick={async () => {
                const success = await write(text)
                if (success) {
                  setText('')
                }
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      )}
    </div>
  )
}

export default Review
