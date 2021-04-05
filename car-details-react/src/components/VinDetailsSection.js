import React,{useState,useEffect} from 'react'

export default function VinDetailsPage(props) {
    const details = props.vinDetails[0]
    return (   
        <div>
            {details?
            <>
                <h1>Vin Details</h1>
                <h5>Make: {details["Make"]} </h5>
                <h5>Model: {details["Model"]} </h5>
                <h5>Year: {details["ModelYear"]}</h5>
                
            </>
            
            :""}
            
          
        
            
        </div>
    )
}
