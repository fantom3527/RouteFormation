import { Track } from "./Models/Track"
import { Point } from "./Models/Point"
import LineAreaChart from "./Components/LineAreaChart"
import { useState, useEffect } from 'react';
import { getPoints, getTracks } from "./api/Track/TrackApi"
import { TrackChart, getTransformationChartData} from "./Utils/chartUtils"

function App() {

  const [countTrack, setCountTrack] = useState(0);
  const [points, setPoints] = useState<Point[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [lineCharts, setLineCharts] = useState<TrackChart[]>([]);
  const [areaCharts, setAreaCharts] = useState<TrackChart[]>([]);

  useEffect(() => {
    TransformationDataForChart();
  }, [points, tracks]);

  const TransformationDataForChart = () => {
    
    if (points.length <= 0 || tracks.length <= 0) {
      return
    }

    const dataChart = getTransformationChartData(points, tracks)

    setLineCharts(dataChart.lineCharts)
    setAreaCharts(dataChart.areaCharts)
  }

  const handleButtonClick = async () => {

    if (countTrack > 0) {
      const newPoints = await getPoints(countTrack * 2) as Point[];
      const newTracks = await getTracks(countTrack) as Track[];
      setPoints(newPoints);
      setTracks(newTracks);
    }    
  };

  return (
    <div className="App">
      <h1>Введите количество Участков</h1>
      <input type="number" value={countTrack} onChange={e => setCountTrack(parseInt(e.target.value))}/>

      <button onClick={handleButtonClick}>
        Сгенерировать
      </button>

      <LineAreaChart lineCharts={lineCharts} areaCharts={areaCharts}/>
    </div>
  );
}

export default App;