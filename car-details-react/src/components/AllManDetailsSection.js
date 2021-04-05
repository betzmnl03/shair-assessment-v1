import React from 'react'

export default function AllManDetailsSection(props) {
    const details = props.allManDetails.Results
    
    return (   
        <div>
            
             <h1>All Manufacturers</h1>

            {details? details.map((item,i)=>{
                return(
                <>
                
                <h3 key={i}>{i+1}.&nbsp;&nbsp;{item["Mfr_Name"]}</h3>
                
                
            </>)
            })
            
            
            :""}
            
        
        
            
        </div>
    )
}
