import React, { useState } from 'react';
import Assign2FileUpload from './Assign2FileUpload';
import Assign2Calculation from './Assign2Calculation';
import Assign1Main from '../Assignment1/Assign1Main';
// . Correlation analysis - Chi-Square Test
// a. User should be able to choose any two attributes.
// b. Display the contingency table
// c. Show the chi-square value and conclusion whether the selected attributes are 
// correlated or not.

// 2. Correlation analysis – Correlation coefficient (Pearson coefficient) & Covariance

// a) User should be able to choose any two attributes.
// b) Show the calculated values and conclusion whether the selected attributes 
// are correlated or not.

// 3. Normalization using following techniques :
// a. Min-max normalization
// b. Z-Score normalization
// c. Normalization by decimal scaling
// i. User should be able to choose any attributes.
// ii. Show the calculated values in tabulated form.
// iii. Show the scatter plot for normalized attributes

function Assign2Main() {

  const [ans, setAns] = useState({chi:null, pc:null})
  const afterCalculation = (data) => {
    setAns(data);
  }
  const [att1, setAtt1] = useState('');
  const [att2, setAtt2] = useState('');

  const handleChangeAtt1 = (e) => {
    setAtt1(e.target.value);
  }
  const handleChangeAtt2 = (e) => {
    setAtt2(e.target.value);
  }

  const [sign, setSign] = useState(null)
  const handleSignif = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const inputValue = e.target.elements.inputValue.value; // Get the value from the input field
    setSign(parseFloat(inputValue));
  }
  const [attributes, setAttributes] = useState([])
  const [dataset, setDataset] = useState({})

  const handleUpload = (data) => {
    setDataset(data['data']);
    setAttributes(data['attributes']);
  };

  return (
    
    <div>
      <h3>Correlation Analysis : </h3>

      Upload file:-
      <Assign2FileUpload onUpload={handleUpload}></Assign2FileUpload>

      <h3>Chi Square test : </h3>

      Select 2 Categorical attributes to check their correlation - 
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
      <Assign2Calculation data={dataset} attribute1={att1} attribute2={att2} onCalculation={afterCalculation}></Assign2Calculation><br/><br/>
      Chi Square Value = {ans['chi']}<br/>
      P value for chi = {ans['pc']}<br/>
      <br/>
      Significance Value - 

      <form onSubmit={handleSignif}> 
        <input type="float" 
        name="inputValue" // Give the input a name to access it in the form handler
        />
        <button type="submit">Submit</button>
      </form>
      { sign!==null ? (
        ans['pc'] > sign ? 
         ( <p>Attributes are Strongly correlated</p>) : (<p>Attributes aren't correlated</p>)
      ) : (<p></p>)
      }
      </div>
      ) : (<p></p>)}
      <h3>Normalization :</h3>
      <Assign1Main assignNo={2}></Assign1Main>
      
    </div>
  );
  }
export default Assign2Main;
