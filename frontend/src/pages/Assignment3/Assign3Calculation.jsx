import React from 'react'

const Assign2Calculation = ({data, method, onCalculation}) => {

    const onButtonClick = () => {
        try{                                                               
            fetch('http://localhost:8000/api/calculate3/', 
                {   
                    method: 'POST',
                    body: JSON.stringify({dataset, method}),  // Serialize the data as JSON
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

export default Assign2Calculation