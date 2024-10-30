import { collection, getDocs, writeBatch } from 'firebase/firestore'
import Button from '../shared/Button'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'

const RecommendHotelButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshot.docs.forEach(async (hotel) => {
      const 추천호텔리스트 = []

      for (const doc of snapshot.docs) {
        if (추천호텔리스트.length === 5) break

        if (doc.id !== hotel.id) {
          추천호텔리스트.push(doc.id)
        }
      }

      batch.update(hotel.ref, { recommendHotels: 추천호텔리스트 })
    })

    await batch.commit()

    alert('업데이트가 완료되었습니다.')
  }
  return <Button onClick={handleButtonClick}>추천호텔 데이터 추가하기</Button>
}

export default RecommendHotelButton
