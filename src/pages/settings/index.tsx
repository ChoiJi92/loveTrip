import ListRow from '@/components/shared/ListRow'
import { Link } from 'react-router-dom'

const SettingsPage = () => {
  return (
    <ul>
      <li>
        <Link to="/settings/like">
          <ListRow
            as="div"
            contents={
              <ListRow.Text title={'찜하기'} subTitle={'찜한 호텔 순서 변경'} />
            }
            withArrow
          />
        </Link>
      </li>
    </ul>
  )
}

export default SettingsPage
