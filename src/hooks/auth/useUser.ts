import { userAtom } from '@/store/atom/user'
import { useRecoilValue } from 'recoil'

const useUser = () => {
  return useRecoilValue(userAtom)
}

export default useUser
