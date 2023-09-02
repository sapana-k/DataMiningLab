import React, { useState } from 'react';
import Assign1FileUpload from './Assign1FileUpload';
import DataDisplay from './Assign1DataDisplay';
import Assign1Calculation from './Assign1Calculation';

//this file sends data from upload file to data display file


//make such functionality - 
//choose file and once file chosen, find attributes then submit
//once submit clicked - calculate statistics data

function Assign1Main() {
    
    const [statistics, setStatistics] = useState({ mean: null, median: null, mode: null, midrange: null, variance: null, std: null, range: null, interquartile: null,fiveSumm:{'high':null, 'q3':null, 'median':null, 'q1':null, 'low':null}});
    const handleCalculation = (data) => {
      setStatistics(data); 
      setIsSelected(true);
    }

    const [attributes, setAttributes] = useState([])
    const [dataset, setDataset] = useState({})
    const [isSelected, setIsSelected] = useState(false)

    const handleUpload = (data) => {
      setDataset(data['data']);
      setAttributes(data['attributes']);
    };

    const [attribute, setAttribute] = useState('')
    const handleChange = (a) => {
      setAttribute(a.target.value)
    }

    return (
      <div className="App">
        <Assign1FileUpload onUpload={handleUpload}/>
{/* file uploaded, now choose attribute to find all the stuff like mean etc */}
        Select a feature from dataset: 
        <select id="attri" onChange={handleChange} value={attribute}>
        <option value=''>Select attribute</option>
        {
          Object.keys(dataset).map((e, i) => (
            <option key={i} value={e}>{e}</option>
          ))
        }
        </select>
        <p>Selected attribute : {attribute}</p>
        <Assign1Calculation data={dataset} attribute ={attribute} onSubmission={handleCalculation}/>
        {// if file selected and calculated then only access attribute of dataset
          //if type of attribute is not number, return <p> select some other attribute
         isSelected ? (typeof dataset[attribute][0] !== 'number' ? (
            <p>This attribute doesn't have numerical value</p>) :
          (<DataDisplay mean={statistics.mean} median={statistics.median} mode={statistics.mode} midrange={statistics.midrange} variance={statistics.variance} std={statistics.std} range={statistics.range} interquartile={statistics.interquartile} fiveSumm={statistics.fiveSumm} attributes={attributes} dataset={dataset}/>)
          ) : <p></p>
        }
        {/* Add scatter plot component here */}
      </div>
    );
  }
  
export default Assign1Main;
