import { Point } from "../../../Models/Point"
import { faker } from '@faker-js/faker';

export const getMockPoints = (count: number):
    Point[] | unknown => {
        const MAX_HEIGHT = 100
        const MIN_HEIGHT = 5

        let points: Point[] = [];
        for (let i = 0; i < count; i++) {
            let point: Point = {
                id: i,
                name:  faker.person.fullName(),
                height: faker.number.int(MAX_HEIGHT) + MIN_HEIGHT
            }
            
            points.push(point)   
    }

    return points;
}