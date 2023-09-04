import { Box } from "@mui/material";
import Map from "./map";
import Panel from "./panel";
import { useState } from "react";

const App = () => {

	const geocoder = new google.maps.Geocoder();

	const [center, setCenter] = useState({ lat: - 25.2744, lng: 133.7751 })
	const [places, setPlaces] = useState<any[]>([])

	const onPlaceChange = (data: any) => {
		if (!data) return;

		const id = data.value
		geocoder.geocode({ placeId: id })
			.then(({ results }) => {
				if (results.length > 0)
					setCenter({
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
					})
			})
	}

	const onAddMarker = () => {
		setPlaces([...places, center])
	}

	return (
		<Box width={"100vw"} height={"100vh"} id="app">
			<Panel onPlaceChange={onPlaceChange} onAddMarker={onAddMarker} />
			<Map center={center} markers={places} />
		</Box>
	);
}

export default App