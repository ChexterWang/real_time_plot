import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Data from './Api';
import './App.css';

const format = {hour: '2-digit', minute: '2-digit', second: '2-digit'};
const size = 10;

const App = () => {
  const [data, setData] = useState({
    "current": [],
    "voltage": [],
    "timestamp": [],
  });

  const fetch = () => {
    Data.getData().then(res => {
      setData(prev => {
        var newData = {...prev};
        ['current', 'voltage', 'timestamp'].forEach(key => {
          newData[key] = [...prev[key], res[key]]
        })
        if(newData['current'].length > size){
          ['current', 'voltage', 'timestamp'].forEach(key => {
            newData[key].shift();
          })
        }
        return newData
      })
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetch();
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='App'>
      <div className='Plot'>
        <Plot
          data={[
            {
              x: data['timestamp'].map(unix => Intl.DateTimeFormat('en-US', format).format(unix*1000)),
              y: data['current'],
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={ {width: 800, height: 600, title: 'A Fancy Plot'} }
        />
      </div>
    </div>
  );
}

export default App;