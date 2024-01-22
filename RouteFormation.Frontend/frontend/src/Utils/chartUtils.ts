import { Surface } from "../Models/Surface"
import { MaxSpeed } from "../Models/MaxSpeed"
import { Point } from "../Models/Point"
import { Track } from "../Models/Track"

export interface PointChart {
    x: number,
    y: number
  }
  
export interface TrackChart {
    points: PointChart[]
    color: string
  }

export interface ChartData {
    lineCharts: TrackChart[]
    areaCharts: TrackChart[]
  }
  
export const getColorForMaxSpeed = (maxSpeed: MaxSpeed): string => {
    switch (maxSpeed) {
      case MaxSpeed.FAST:
        return 'green';
      case MaxSpeed.NORMAL:
        return 'orange';
      case MaxSpeed.SLOW:
        return 'red';
      default:
        return 'black';
    }
  };
  
export const getColorForSurface = (maxSpeed: Surface): string => {
    switch (maxSpeed) {
      case Surface.ASPHALT:
        return 'gray';
      case Surface.GROUND:
        return 'brown';
      case Surface.SAND:
        return 'beige';
      default:
        return 'black';
    }
  };
  
  export const getMaxHeightPoints = (points: Point[]): number => {
    return points.reduce((prevPoint, currentPoint) => {
      return (prevPoint.height > currentPoint.height) ? prevPoint : currentPoint;
    }).height
  }

export const geHeightPointById = (points: Point[], id: number): number => {
    return points.find((point) => point.id === id)?.height as number
}

const createPointChart = (x: number, y: number): PointChart => {
    return {
                x: x,
                y: y
            }
}

const createTrackChart = (height: number[], distance: number[], color: string): TrackChart => {
    let points: PointChart[] = []
    
    //TODO: сделать отдельные функции под line и area и вытащить отдельную функцию цикл
    for (let i = 0; i < 2; i++) {
        points.push(createPointChart(distance[i], height[i] ))
    }

    return {points: points,
            color: color}
}


export const getTransformationChartData = (points: Point[], tracks: Track[]): ChartData => {
    const RESERVE_HEIGHT = 10
    let lines: TrackChart[] = []
    let areas: TrackChart[] = []
    let distance: number = 0

    const areaHeight: number = getMaxHeightPoints(points) + RESERVE_HEIGHT

    for (let track of tracks) {
      const firstPointHeight: number = geHeightPointById(points, track.firstId) 
      const secondPointHeight: number = geHeightPointById(points, track.secondId)
      const nextDistance = distance + track.distance

      let line = createTrackChart([firstPointHeight, secondPointHeight], [distance, nextDistance], getColorForMaxSpeed(track.maxSpeed))
      let area = createTrackChart([areaHeight, areaHeight], [distance, nextDistance], getColorForSurface(track.surface))

      distance = nextDistance

      lines.push(line)
      areas.push(area)
    }

    return { lineCharts: lines,
             areaCharts: areas }
  }