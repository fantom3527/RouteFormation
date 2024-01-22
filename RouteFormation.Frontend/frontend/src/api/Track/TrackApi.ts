import { Track } from "../../Models/Track"
import { Point } from "../../Models/Point"
import { getMockPoints } from "./MockData/MockPoint"
import { getMockTracks } from "./MockData/MockTrack"

export const getPoints = async (count: number): 
    Promise<Point[] | unknown> => {
    
     //TODO: проверять на доступность бекенда, если не доступен, то брать в моках
    try {
        const responce = await getMockPoints(count);
        return responce;
    }
    catch (error) {
      // Обработка ошибки
      console.error('An error occurred:', error);
      // Возвращение значения по умолчанию или выброс другого исключения
      throw new Error('Failed to fetch points');
    }
}

export const getTracks = async (count: number):
    Promise<Track[] | unknown> => {
    
    try {
        const responce = await getMockTracks(count);
        return responce;
    }
    catch (error) {
      //TODO: сделать функцию обработки ошибок.

      // Обработка ошибки
      console.error('An error occurred:', error);
      // Возвращение значения по умолчанию или выброс другого исключения
      throw new Error('Failed to fetch points');
    }
}




