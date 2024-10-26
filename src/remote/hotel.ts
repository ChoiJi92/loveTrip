import {
  collection,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants'
import { Hotel } from '@/models/hotel'

const getHotels = async (pageParams?: QuerySnapshot<Hotel>) => {
  const hotelsQuery = !pageParams
    ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
    : query(
        collection(store, COLLECTIONS.HOTEL),
        startAfter(pageParams),
        limit(10),
      )

  const hotelsSnapshot = await getDocs(hotelsQuery)
  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  return {
    items,
    lastVisible,
  }
}

export default getHotels
