import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrackChart } from "../Utils/chartUtils"

interface ChartProps {
  lineCharts: TrackChart[];
  areaCharts: TrackChart[];
}

const LineAreaChart: React.FC<ChartProps> = ({ lineCharts, areaCharts }) => {
    return (
      <ComposedChart width={1000} height={500} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="x" type='number'/>
        <YAxis />
        
        {lineCharts.map((linechart, index) => {
          return (
            <Line key={index}
                  data={linechart.points}
                  dataKey="y"
                  stroke={linechart.color}
                  fill={linechart.color} 
                  type="monotone"/>
          )
        })}
  
        {areaCharts.map((areachart, index) => {
          return (
            <Area data={areachart.points}
                  dataKey="y"
                  stroke={areachart.color}
                  fill={areachart.color} />
          )
        })}
      </ComposedChart>
    );
}
  
  export default LineAreaChart;