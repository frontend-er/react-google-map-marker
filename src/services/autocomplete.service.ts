import axios from 'axios'
import { GOOGLE_MAP_API_KEY } from '../config/app.config'

export const getSuggest = async (search: string) => {
    const suggests = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&types=geocode&key=${GOOGLE_MAP_API_KEY}&components=country:AU`)
    return suggests
}