import React from 'react'

//att1 = dataset, att2= method of classifier
const Assign3Calculation = ({att1, att2, onCalculation}) => {

    const onButtonClick = () => {
        try{                                                               
            fetch('http://localhost:8000/api/calculate3/', 
                {   
                    method: 'POST',
                    body: JSON.stringify({att1, att2}),  // Serialize the data as JSON
                    headers: {'Content-Type': 'application/json'}
                }
            ).then((response)=>response.json()).then(
                (result)=>{
                    console.log("Calculated data", result);
                    onCalculation(result);
                }
            )
            .catch((e)=>{
                console.log("sapana error in fetching data2 ", e)
            });
        }
        catch(e){
            console.log("sapana error", e)
        }
    }
    
    return (
        <button onClick={onButtonClick}>Submit</button>
    );
}

export default Assign3Calculation