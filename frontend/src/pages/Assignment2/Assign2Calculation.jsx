import React from 'react'

const Assign2Calculation = ({data, attribute1, attribute2, onCalculation}) => {

    const onButtonClick = () => {
        const att1 = data[attribute1];
        const att2 = data[attribute2];
        try{                                                               
            fetch('http://localhost:8000/api/calculate2/', 
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

export default Assign2Calculation