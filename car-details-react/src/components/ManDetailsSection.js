import React from 'react'

export default function ManDetailsSection(props) {
    const details = props.manDetails

    return (   
        <div>
             <h1>Manufacturer Details</h1>
             <h3>Manufacturer: {details[0]["Mfr_Name"]}</h3>
            {details? details.map((item,i)=>{
                return(
                <>
                <h5 key={i}>Make: {item["Make_Name"]} </h5>
                
            </>)
            })
            
            
            :""}
            
          
        
            
        </div>
    )
}
