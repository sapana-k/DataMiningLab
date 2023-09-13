import React, {useState} from 'react'
import Assign1FileUpload from '../Assignment1/Assign1FileUpload';
import Assign3Calculation from '../Assignment3/Assign3Calculation';
import image from 'file:///C:/Users/sapan/Downloads/adminPanelAssignment1/csvapp/static/plot/image.png'
const Assign3Main = () => {
  const [att1, setAtt1] = useState('');

  const [treeImage, setTreeImage] = useState(null);
   const handleCalculation = (data) => {
      setTreeImage(data); 
    }

  const handleChangeAtt1 = (e) => {
    setAtt1(e.target.value);
  }
  const options = [
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
      <Assign3Calculation att1={dataset} att2 ={att1} onCalculation={handleCalculation}/> 
      <h2>Decision Tree Visualization</h2>
      <img src={image} alt="decision tree">
      </img>
          {/* {image && <img src={image} alt="Decision Tree" />} */}
    </div>
  )
}

export default Assign3Main