import { useCallback, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'

const Map = ({ center, markers }: { center: { lat: number, lng: number }, markers: any[] }) => {

    const [map, setMap] = useState<any>(null)

    const onLoad = useCallback((map: google.maps.Map) => setMap(map), [])
    const onUnmount = useCallback(() => setMap(null), [])

    return (
        <GoogleMap
            zoom={4}
            onLoad={onLoad}
            onUnmount={onUnmount}
            center={center}
            mapContainerStyle={{ width: "100vw", height: "100vh" }}
        >
            {
                markers.map((marker: any, idx: number) => (
                    <Marker key={idx} position={marker} />
                ))
            }
        </GoogleMap>
    )
}
export default Map
