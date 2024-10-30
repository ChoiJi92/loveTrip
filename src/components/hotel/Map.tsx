import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import Flex from '../shared/Flex'
import { Hotel } from '@/models/hotel'
import Text from '../shared/Text'

const Map = ({ location }: { location: Hotel['location'] }) => {
  const {
    directions,
    pointGeolocation: { x, y },
  } = location
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
  })

  if (!isLoaded) {
    return null
  }

  return (
    <Flex direction="column" style={{ padding: 24 }}>
      <Text typography="t4" bold>
        기본 정보
      </Text>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '250px',
          margin: '16px 0',
          boxSizing: 'border-box',
        }}
        center={{
          lat: y,
          lng: x,
        }}
        zoom={15}
      >
        <Marker position={{ lat: y, lng: x }} />
      </GoogleMap>
      <Text typography="t6">{directions}</Text>
    </Flex>
  )
}

export default Map
