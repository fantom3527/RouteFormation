import { Track } from "../../../Models/Track"
import { MaxSpeed } from "../../../Models/MaxSpeed"
import { Surface } from "../../../Models/Surface"
import { faker } from '@faker-js/faker';

export const getMockTracks = (count: number): 
    Track[] | unknown => {
        const MAX_DISTANCE = 20
        const MIN_DISTANCE = 5
        
        let tracks: Track[] = []
        for (let i = 0; i < count; i++) {
            let track: Track = {
                firstId: i,
                secondId: i + 1,
                distance: faker.number.int(MAX_DISTANCE) + MIN_DISTANCE,
                surface: faker.helpers.arrayElement([Surface.SAND, Surface.ASPHALT, Surface.GROUND]),
                maxSpeed: faker.helpers.arrayElement([MaxSpeed.FAST, MaxSpeed.NORMAL, MaxSpeed.SLOW])
            } 
            tracks.push(track)
        }

        return tracks;
    }