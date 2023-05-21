import { useEffect, useState } from 'react'
import PieChartDemo from './PieChartDemo'
import LineChartDemo from './LineChartDemo'
import { AnalysisResult } from './types';

const TIME_STEP = 3;
const INITIAL_DUMMY_RESULT: AnalysisResult = {
  batch: 0,
  negative: 0,
  neutral: 0,
  positive: 0
};

function App() {

  const [data, setData] = useState<AnalysisResult[]>([INITIAL_DUMMY_RESULT]);
  const [latestResult, setLatestResult] = useState(INITIAL_DUMMY_RESULT);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
      const timerId = isRunning ? setTimeout(() => {
        setTimer(timer + TIME_STEP)
        updateData();
      }, TIME_STEP * 1000) : undefined;

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }, [timer, isRunning]);

  // TODO - update with actual api call
  function fetchLatestData() {
    const lastIndex = data.length - 1;
    const randomNeutral = Math.random() * 1000;
    const randomPositive = Math.random() * 1000;
    const randomNegative = Math.random() * 1000;
    return Promise.resolve({ 
      batch: data[lastIndex].batch + 10,
      neutral: data[lastIndex].neutral + Math.ceil(randomNeutral),
      positive: data[lastIndex].positive + Math.ceil(randomPositive),
      negative: data[lastIndex].negative + Math.ceil(randomNegative)
    });
  }

  function updateData() {
    fetchLatestData().then(response => {
      const lastIndex = data.length - 1;
      const latestBatch = data[lastIndex].batch
      if (response.batch != latestBatch) {
        setData([...data, response]);
      }
    })
  }

  useEffect(() => {
    const lastIndex = data.length - 1;
    setLatestResult(data[lastIndex]);
  }, [data])

  return (
    <div className="m-6">
        <div className="text-center pb-6">
          <span className="">Charts Proof of Concept</span>
          {isRunning && <button type="button" className="ml-3 bg-red-300 px-4 py-1 rounded-md hover:bg-red-400 hover:text-white" 
            onClick={() => setIsRunning(false)}>
              Stop
          </button> }
          {!isRunning && <button type="button" className="ml-3 bg-green-300 px-4 py-1 rounded-md hover:bg-green-400 hover:text-white" 
            onClick={() => setIsRunning(true)}>
              Start
          </button> }
        </div>
       {data.length > 1 && <PieChartDemo result={latestResult}/>}
       {data.length > 1 && <LineChartDemo data={data}/>}
    </div>
  )
}

export default App
