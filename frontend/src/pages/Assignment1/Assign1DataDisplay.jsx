import './styles.css';
import './Assign1Plots';
import React, {useState} from 'react';
import { Scatter } from 'react-chartjs-2';
import { Boxplot } from 'react-chartjs-2';

function DataDisplay ({ mean, median, mode, midrange, variance, std, range, interquartile, fiveSumm, attributes, dataset}){
  
  const [att, setAtt] = useState('');
  const handleAttChange = (event) => {
    setAtt(event.target.value);
  };

  const [xaxis, setXaxis] = useState('');
  const handleChangex = (event) => {
    setXaxis(event.target.value);
  };

  const [yaxis, setYaxis] = useState('');
  const handleChangey = (event) => {
    setYaxis(event.target.value);
  };

  const QuantilePlot = ({data}) => {

  }

  const QQPlot = ({data}) => {
    
  }
  
  const Histogram = ({data}) => {
    
  }

  const ScatterPlot = ({irisData}) => {
    const data = {
      labels: 'Labelll',
      datasets: [
        {
          label: 'Sepal Length vs Sepal Width',
          data: {
            x: irisData['SepalLengthCm'],
            y: irisData['SepalWidthCm']
        },
          // data: irisData.map((entry) => ({
          //   x: entry.sepalLengthCm,
          //   y: entry.sepalWidthCm,
          // })),
          backgroundColor: 'rgba(75, 192, 192, 0.4)',
        },
        // Add more datasets for other combinations
      ],
    };
  
    return <Scatter data={data} />;
  }

  // const BoxPlot = ({irisData}) => {
  //   const labels = irisData.map((entry) => entry.Species);
  //   const datasets = [
  //     {
  //       label: 'Sepal Length',
  //       data: irisData.map((entry) => entry.SepalLengthCm),
  //     },
  //     // Add more datasets for other attributes
  //   ];
  
  //   const data = {
  //     labels,
  //     datasets,
  //   };
  
  //   return <Boxplot data={data} />;
  // }

  const options= [
    {label: 'Quantile plot', value: 'QuantilePlot//'},
    {label: 'Quantile-quantile plot', value: 'QQPlot//'},
    {label: 'Histogram', value: 'HistohramPlot//'},
    {label: 'Scatter plot', value: 'ScatterPlot//'},
    {label: 'Boxplot', value: 'BoxPlot//'},
  ]
  return (
    <div>
      <br></br>
      <table>
      <thead>
        <tr>
          <th>Mean</th>
          <th>Median</th>
          <th>Mode</th>
          <th>Mid Range</th>
          <th>Variance</th>
          <th>Standard Deviation</th>
        </tr>
        </thead>
        <tbody>
        <tr className={mean === null ? 'hidden' : ''}>
          <td>{JSON.stringify(median)}</td>
          <td>{JSON.stringify(mean)}</td>
          <td>{JSON.stringify(mode)}</td>
          <td>{JSON.stringify(midrange)}</td>
          <td>{JSON.stringify(variance)}</td>
          <td>{JSON.stringify(std)}</td>
        </tr>
        </tbody>
      </table>

      <br/>
      <h3>Dispersions:</h3>
 
      <table>
        <thead>
        <tr>
          <th>Range</th>
          <th>Interquartile Range</th>
          <th>Five number Summary</th>
        </tr>
        </thead>
        <tbody>
        <tr className={range === null ? 'hidden' : ''}>
          <td>{JSON.stringify(range)}</td>
          <td>{JSON.stringify(interquartile)}</td>
          <td>
            <table>
            <thead>
            <tr>
            <th>high</th>
            <th>Q3</th>
            <th>Q2</th>
            <th>Q1</th>
            <th>low</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{JSON.stringify(fiveSumm['high'])}</td>
              <td>{JSON.stringify(fiveSumm['q3'])}</td>
              <td>{JSON.stringify(fiveSumm['median'])}</td>
              <td>{JSON.stringify(fiveSumm['q1'])}</td>
              <td>{JSON.stringify(fiveSumm['low'])}</td>
            </tr>
            </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
      <br/>
      <h3>Graphical Display of Dispersion of Data: </h3>
      <br/>
      X axis :  <select id="xaxis" onChange={handleChangex} value={xaxis}>
        <option value=''>Select X-axis parameter</option>
        {
        attributes.map((e, i)=> (
         <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
      Y axis :  <select id="yaxis" onChange={handleChangey} value={yaxis} >
        <option value=''>Select Y-axis parameter</option>
        {
        attributes.map((e, i)=> (
          <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
      <p>x - {xaxis}</p>
      <p>y - {yaxis}</p>
      <h4>Quantile Plot : </h4> 
      <h4>Quantile-Quantile Plot : </h4> 
      <h4>Scatterplot : </h4>
      <h4>Histogram : </h4> 
      <h4>Boxplot : </h4>
    </div>
  );
}
  export default DataDisplay;
  