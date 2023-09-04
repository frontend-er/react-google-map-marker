import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { debounce } from '@mui/material/utils';
import { useEffect, useState } from 'react'

const autocompleteService = { current: null }

const Panel = ({ onPlaceChange, onAddMarker }: { onPlaceChange?: any, onAddMarker?: any }) => {

    const [suggest, setSuggest] = useState<any>([])

    useEffect(() => {
        autocompleteService.current = new (
            window as any
        ).google.maps.places.AutocompleteService()
    }, [])

    const onChange = debounce((e: any) => {
        const search = e.target.value

        if (!autocompleteService.current)
            return;

        (autocompleteService.current as any).getPlacePredictions(
            { input: search, componentRestrictions: { country: "au" } },
            (results: any[]) => {
                setSuggest(results.map(item => ({ label: item.description, value: item.place_id })))
            },
        )
    }, 400)


    return (
        <Box position={'absolute'} borderRadius={3} top={128} left={8} padding={2} sx={{ backgroundColor: "white", zIndex: 1000 }}>
            <Box display={'flex'} gap={2}>
                <Autocomplete
                    disablePortal
                    options={suggest}
                    sx={{ width: 300 }}
                    onChange={(_, newVal: string) => onPlaceChange && onPlaceChange(newVal)}
                    renderInput={(params) => <TextField {...params} label="Address" onChange={onChange} />}
                />
                <Button color='primary' variant='contained' onClick={onAddMarker}>Add Point</Button>
            </Box>
        </Box>
    )
}

export default Panel