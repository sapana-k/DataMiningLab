import React from 'react'
import Assign1Main from '../Assignment1/Assign1Main'
import Assign1FileUpload from '../Assignment1/Assign1FileUpload';
const Assign3Main = () => {
  const [att1, setAtt1] = useState('');

  const [statistics, setStatistics] = useState({ mean: null, median: null, mode: null, midrange: null, variance: null, std: null, range: null, interquartile: null,fiveSumm:{'high':null, 'q3':null, 'median':null, 'q1':null, 'low':null}, attributes: [], df:[], min_max_norm: [],z_score_norm:[],dec_scaling_norm:[]});
    const handleCalculation = (data) => {
      setStatistics(data); 
    }

  const handleChangeAtt1 = (e) => {
    setAtt1(e.target.value);
  }
  options = [
    'information_gain',
    'gain_ratio',
    'gini_index'
  ];
  const [attributes, setAttributes] = useState([])
  const [dataset, setDataset] = useState({})

  const handleUpload = (data) => {
    setDataset(data['data']);
    setAttributes(data['attributes']);
  };

  return (
    <div className="App">
      <Assign1FileUpload onUpload={handleUpload}/>
      Attribute 1 :  <select id="att1" onChange={handleChangeAtt1} value={att1}>
        <option value=''>Select attribute</option>
        {
        options.map((e, i)=> (
         <option key={i} value={e}>{e}</option>
        ))
        }
      </select>
      <Assign1Calculation data={dataset} method ={att1} onSubmission={handleCalculation}/>   
    </div>
  )
}

export default Assign3Main