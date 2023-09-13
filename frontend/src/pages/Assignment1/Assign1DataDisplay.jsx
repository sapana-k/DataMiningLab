import './styles.css';
import {ScatterPlot, BoxPlot, Histogram} from './Assign1Plots';
import Assign2Calculation from '../Assignment2/Assign2Calculation';
import React, {useState} from 'react';

function DataDisplay ({ mean, median, mode, midrange, variance, std, range, interquartile, fiveSumm, attributes, dataset}){
  
  const [histogramAtt, sethistogramAtt] = useState('');
  const handlehistogramAttChange = (event) => {
    sethistogramAtt(event.target.value);
  };

  const [xaxisSc, setXaxisSc] = useState('');
  const handleChangexSc = (event) => {
    setXaxisSc(event.target.value);
  };

  const [yaxisSc, setYaxisSc] = useState('');
  const handleChangeySc = (event) => {
    setYaxisSc(event.target.value);
  };

  const [xaxisqq, setXaxisqq] = useState('');
  const handleChangexqq = (event) => {
    setXaxisqq(event.target.value);
  };

  const [yaxisqq, setYaxisqq] = useState('');
  const handleChangeyqq = (event) => {
    setYaxisqq(event.target.value);
  };

  const [coef, setCoef] = useState(null)
  const [p, setP] = useState(null)
  const afterCalculation = (data) => {
    setCoef(data['coef']);
    setP(data['p']);
  }
  const [att1, setAtt1] = useState('');
  const [att2, setAtt2] = useState('');

  const handleChangeAtt1 = (e) => {
    setAtt1(e.target.value);
  }
  const handleChangeAtt2 = (e) => {
    setAtt2(e.target.value);
  }
  
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
          <td>{JSON.stringify(mean)}</td>
          <td>{JSON.stringify(median)}</td>
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
            <th>low</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>high</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{JSON.stringify(fiveSumm['low'])}</td>
              <td>{JSON.stringify(fiveSumm['q1'])}</td>
              <td>{JSON.stringify(fiveSumm['median'])}</td>
              <td>{JSON.stringify(fiveSumm['q3'])}</td>
              <td>{JSON.stringify(fiveSumm['high'])}</td>
            </tr>
            </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
      <br/>
      <h3>Graphical Display of Dispersion of Data: </h3>
      <h4>Quantile Plot : </h4> 
      <h4>Quantile-Quantile Plot : </h4> 
      X axis :  <select id="xaxis" onChange={handleChangexqq} value={xaxisqq}>
        <option value=''>Select X-axis parameter</option>
        {
        attributes.map((e, i)=> (
         <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
       Y axis :  <select id="yaxis" onChange={handleChangeyqq} value={yaxisqq} >
        <option value=''>Select Y-axis parameter</option>
        {
        attributes.map((e, i)=> (
          <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
      <h2>{yaxisqq}</h2>
      <h2>{xaxisqq}</h2>
      <h4>Scatterplot : </h4>
      X axis :  <select id="xaxis" onChange={handleChangexSc} value={xaxisSc}>
        <option value=''>Select X-axis parameter</option>
        {
        attributes.map((e, i)=> (
         <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
       Y axis :  <select id="yaxis" onChange={handleChangeySc} value={yaxisSc} >
        <option value=''>Select Y-axis parameter</option>
        {
        attributes.map((e, i)=> (
          <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
      <ScatterPlot data={dataset} xaxis={xaxisSc} yaxis={yaxisSc}></ScatterPlot>
      <h4>Histogram : </h4> 
      Select X-axis :  <select id="xaxis" onChange={handlehistogramAttChange} value={histogramAtt}>
        <option value=''>Select attribute</option>
        {
        attributes.map((e, i)=> (
         <option key={i} value={e}>{e}</option>
        ))
        }
        </select>
      <Histogram dataset = {dataset} att = {histogramAtt}></Histogram>
      <h4>Boxplot : </h4>
      <BoxPlot data={dataset}></BoxPlot>

      <h2>Correlation Analysis - </h2>

      Select 2 attributes to check their correlation - 
    {attributes ? ( 
      <div>
      Attribute 1 :  <select id="att1" onChange={handleChangeAtt1} value={att1}>
        <option value=''>Select attribute</option>
        {
        attributes.map((e, i)=> (
         <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
      Attribute 2 :  <select id="att2" onChange={handleChangeAtt2} value={att2} >
        <option value=''>Select attribute</option>
        {
        attributes.map((e, i)=> (
          <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
      </div> 
      ) : (<p></p>)}
      <Assign2Calculation data={dataset} attribute1={att1} attribute2={att2} onCalculation={afterCalculation}></Assign2Calculation>
      <div>Correlation coefficient of {att1} and {att2} is {coef} and p value is {p}</div>
  </div>
  );
}
  export default DataDisplay;
  