import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';


export const ScatterPlot = ({data, xaxis, yaxis}) => {
    return (
      <Plot
        data={[
          {
            x: data[xaxis],
            y: data[yaxis],
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 700, height: 500, title: 'Scatter Plot', xaxis:{title: xaxis}, yaxis: {title: yaxis} }}
      />
    );
};

export const BoxPlot = ({data}) => {

  //list of objects, each object containing name of attribute and its values
    const [dataList, setDataList] = useState([]);

  // useEffect hook to update dataList only when data props change, not when state change or when it re-renders
  useEffect (()=>{
    const newDataList = Object.keys(data).map((key) => (
      key!=='Id'? {
      name: key , // attribute name
      y: data[key], //list of values of that attribute
      type: 'box'
      } : {}
    ));
    setDataList(newDataList)
  //dependency is 'data', useEffect only changes state when dependency (which here is 'data') changes
  }, [data]);

  var layout = {
    width: 700,
    height: 500,
    title: 'Box Plot'
  };
      
  return (<Plot data={dataList} layout={layout} />);
};

export const Histogram = ({dataset, att}) => {
  var trace = {
      x: dataset[att],
      type: 'histogram',
    };

    var layout = {
      width: 700,
      height: 500,
      title: 'Histogram',
      xaxis: {title: att}
    };

  var d = [trace];
  return <Plot data = {d} layout = {layout}></Plot>
}

