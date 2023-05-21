import { LineChart, Tooltip, Legend, Line, XAxis, YAxis } from "recharts";
import { AnalysisResult } from "./types";

type LineChartDemoProps = {
    data: AnalysisResult[]
}

function LineChartDemo(props: LineChartDemoProps) {

    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <h2 className="font-bold">Line Chart Proof of Concept</h2>
                {/* <button type="button" onClick={() => setIsRunning(!isRunning)}>{ isRunning ? "Stop" : "Start"}</button> */}
            </div>
            <LineChart width={730} height={500} data={props.data}>
                <Tooltip animationDuration={500} cursor={{ color: 'red' }}/>
                <Legend verticalAlign="top" height={36}/>
                <XAxis dataKey="batch"  />
                <YAxis />
                <Line type="monotone" dataKey="neutral" stroke="gray"/>
                <Line type="monotone" dataKey="negative" stroke="red"/>
                <Line type="monotone" dataKey="positive" stroke="green"/>
            </LineChart>
        </div>
    );
}

export default LineChartDemo;