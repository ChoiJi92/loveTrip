import { COLLECTIONS } from '@/constants'
import { store } from '@/remote/firebase'
import { getRooms } from '@/remote/room'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'

export const useRooms = ({ hotelId }: { hotelId: string }) => {
  const client = useQueryClient()
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        client.setQueryData(['rooms', hotelId], newRooms)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [hotelId, client])
  return useQuery({
    queryKey: ['rooms', hotelId],
    queryFn: () => getRooms(hotelId),
  })
}
