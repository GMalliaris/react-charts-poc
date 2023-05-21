import { PieChart, Legend, Tooltip, Pie, Cell } from "recharts"
import { AnalysisResult } from "./types";
import { useEffect, useState } from "react";

type SentimentAnalysisResult = {
  sentiment: string;
  count: number;
  color: string;
}

type PieChartDemoProps = {
  result: AnalysisResult
}

function PieChartDemo(props: PieChartDemoProps){

  const [usableData, setUsableData] = useState<SentimentAnalysisResult[]>([]);

  useEffect(() => {
    const resultsArray = [
      {
        sentiment: "neutral",
        count: props.result.neutral,
        color: "gray",
      },
      {
        sentiment: "positive",
        count: props.result.positive,
        color: "green",
      },
      {
        sentiment: "negative",
        count: props.result.negative,
        color: "red",
      }
    ];
    setUsableData(resultsArray);
  }, [props.result]);

  function mapResultToCell(result: SentimentAnalysisResult) {
    return <Cell key={result.sentiment} fill={result.color}/>;
  }

  return (
      <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold">Pie Chart Proof of Concept</h2>
          <PieChart width={730} height={500}>
              <Tooltip animationDuration={500} cursor={{ color: 'red' }} />
              <Legend verticalAlign="top" height={36}/>
              <Pie data={usableData} dataKey="count" nameKey="sentiment" cx="50%" cy="50%" outerRadius={160} fill="#8884d8" 
              style={{cursor: "pointer"}} animationBegin={200} animationDuration={600}>
                { usableData.map(result => mapResultToCell(result)) }
              </Pie>
          </PieChart>
      </div>
  );
}

export default PieChartDemo;