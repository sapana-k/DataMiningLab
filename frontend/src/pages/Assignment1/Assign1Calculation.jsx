import React, {useState} from 'react';
// this file recieves the column/attribute whose mean, median etc needs to be found
//and sends all calculated values
const Assign1Calculation = ({ data, attribute, onSubmission}) => {

  const handleCalculation = () => {
    const coldata = data[attribute];
    console.log(coldata)
    try {
      fetch(
        'http://localhost:8000/api/calculate/',
        {
          method: 'POST',
          // body: coldata,
          body: JSON.stringify(coldata), // Serialize the data as JSON
          headers: {
            'Content-Type': 'application/json', // Set the content type
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
          //send calculation as response data
          onSubmission(result);
        })
        .catch((error) => {
          console.error('Sapna Error in sending response data :', error);
        });
    }
    catch (error) {
      console.error('Sapna Error in fetching  data:', error);
    }
  };

  return (
    <div>
    <button onClick={handleCalculation}>Submit</button>
  </div>
  );
};

export default Assign1Calculation;
