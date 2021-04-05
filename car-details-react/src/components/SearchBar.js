import React, { useState} from 'react'
import { Form, Select} from 'semantic-ui-react'
import {Details} from "../requests"
import VinDetailsSection from "./VinDetailsSection"
import ManDetailsSection from "./ManDetailsSection"
import AllManDetailsSection from "./AllManDetailsSection"
const SearchBar = (props)=>{
  const [vin, setVin] = useState("")
  const [vinDetails,setVinDetails] = useState(undefined)
  const [manDetails,setManDetails] = useState(undefined)
  const [allManDetails,setAllManDetails] = useState(undefined)
  const [manufacturer, setManufacturer] = useState("")
  const [result, setResult] = useState("")

 const handleSubmit = (event) => {   
    const params={
        vin: vin,
        manufacturer: manufacturer
    }
    if(vin==="" && manufacturer ===""){
      setResult("Please enter a VIN or select Manufacturer")
    }
    else{
    Details.index(params)
    .then((res)=>{
      console.log(res)
      if(res.Results[0]["ErrorCode"] && res.Results[0]["ErrorCode"]!=="0"){
        setResult(res.Results[0]["ErrorText"])
      }
      else{
        
        if(res.Results&& vin.length>0){
          setVinDetails(res.Results)
          setManDetails(undefined)
          setAllManDetails(undefined)
        }
        else if(res.Results && manufacturer!=="0"){
          setManDetails(res.Results)
          setAllManDetails(undefined)
          setVinDetails(undefined)
        }
        else if(res.Results && manufacturer==="0"){
          setAllManDetails(res)
          setManDetails(undefined)
          setVinDetails(undefined)
        }
      }
    })
  }
  }

  function validateVin(vin) {
    let re = new RegExp("^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$");
    return vin.match(re);
  }

  const handleChange =(e,{value})=>{
    if(value){
    let searched = props.manuArr.filter(obj=>{
      return obj["value"]===value
    })
    if(searched.id === 0){
      setManufacturer("all")
    }
    else if(searched.id!==0){
      setManufacturer(searched[0].id)
    }
    setVin("")
    setResult("")
  }
  }

  const handleVinClick =(event)=>{
    const clear_button = document.querySelector(".dropdown.icon.clear")
    clear_button && clear_button.click()
    setManufacturer("")
    setResult("")
  }
  const handleManufacturerClick=()=>{
    setVin("")
    
  }

  const handleVinChange=(event)=>{
    let temp=event.target.value
    if(!validateVin(temp)){
      setResult("Not a valid VIN")
    }
    else{
      setResult("")
    }
    setVin(temp)
  }
  
    return (
      
      <>
      <Form onSubmit={event=>handleSubmit(event)}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Seaech by VIN' name="vin" id="vin" placeholder='Enter the VIN number' onClick={(event)=>handleVinClick(event)} value={vin} onChange={(event)=>handleVinChange(event)}/>         
          <span> OR </span>
          <Form.Select
            search
            clearable
            label='Search by Manufacturer'
            options={props.manuArr.map(item => ({
              name: item.value,
              key: item.key,
              id:item["id"],
              value: item.value,
              text: item.text
            }))}
            placeholder='Select Manufacturer'
            onChange={handleChange}
            onClick={handleManufacturerClick}
          />
        </Form.Group>
        <Form.Button>Search</Form.Button>
      </Form>
      <div>{result}</div>
      {vinDetails?
      <VinDetailsSection vinDetails={vinDetails}/>
    :""}

    {manDetails?
      <ManDetailsSection manDetails={manDetails}/>
    :""}
        {allManDetails?
      <AllManDetailsSection allManDetails={allManDetails}/>
    :""}
      
      </>
    )
}


export default SearchBar
