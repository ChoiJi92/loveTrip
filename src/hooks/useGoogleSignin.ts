import { useCallback } from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth, store } from '@/remote/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'

const useGoogleSignin = () => {
  const navigate = useNavigate()
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)

      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )

      // 이미 가입한 유저
      if (userSnapshot.exists()) {
        navigate('/')
      } else {
        const newUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }

        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          newUser,
        )
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          return
        }
      }

      throw new Error('fail to signin')
    }
  }, [navigate])
  const signout = useCallback(() => {
    signOut(auth)
  }, [])
  return { signin, signout }
}

export default useGoogleSignin
