import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const Assign2Display = ({dataset, attributes, attName, att, min, zsc, dec}) => {
  const rowCount = min.length;

  const [xaxisSc, setXaxisSc] = useState('');
  const handleChangexSc = (event) => {
    setXaxisSc(event.target.value);
  };

  const [res, setRes] = useState({'norm1': null, 'norm2':null});

  const [yaxisSc, setYaxisSc] = useState('');
  const handleChangeySc = (event) => {
    setYaxisSc(event.target.value);
  };

  const onDone = () => {
    try{
      fetch(
        'http://localhost:8000/api/norm/', 
        {
          method : 'POST',
          body: JSON.stringify({dataset, xaxisSc, yaxisSc}),
          headers: {'Content-Type': 'application/json'}
        }
      ).then((response)=>response.json()).then(
        (result)=>
        {
          console.log("normalised data",result);
          setRes(result);
        }
      )
      .catch((e)=>{
        console.log("sapana error in fetching data2 ", e)
      })
    }
    catch(e){
      console.log("error fetching data", e)
    }
  }
  return (
    <div>
      <h4> Normalization using following techniques :</h4>
      <table>
        <thead>
        <tr>
        <th>Attribute</th>
        <th>Min-max normalization</th>
        <th>Z-Score normalization</th>
        <th>Normalization by decimal scaling</th>
        </tr>
        </thead>
        <tbody> 
        {Array.from({ length: rowCount }, (_, index) => (
          <tr key={index}>
            <td>{att[index]}</td>
            <td>{min[index]}</td>
            <td>{zsc[index]}</td>
            <td>{dec[index]}</td>
          </tr>
        ))
        }
      </tbody>
      </table>
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
      <button onClick={onDone}>Submit</button>
      {console.log(res)}
      <Plot
        data={[
          {
            x: res['norm1'],
            y: res['norm2'],
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 700, height: 500, title: 'Scatter Plot', xaxis:{title: xaxisSc}, yaxis: {title: yaxisSc} }}
      />{/* normalise the attributes before sending to scatter plot*/}
      
      
      
    </div>
  )
}

export default Assign2Display