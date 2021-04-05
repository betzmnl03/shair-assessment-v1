import './App.css';
import {useState, useEffect} from "react"
import SearchBar from './components/SearchBar';
import { Details } from './requests';


function App() {
  const final=[]
  const[manuArr, setManuArr] = useState([])
  const getManufacturer=()=>{
    const params={
      vin:"",
      manufacturer:"0"
    }
    Details.index(params)
    .then((res)=>{
      final[0]={
        "key":"0",
        "text":"All",
        "value":"all",
        "id":"0"
      }
      res.Results.forEach((item,i)=>{
        
        let manuObj={
          "key":i+1,
          "text":item.Mfr_Name,
          "value":item.Mfr_Name,
          "id":item.Mfr_ID
        }
        if(!final.includes(manuObj)){
          final.push(manuObj)
        }
        
      }
      )
      setManuArr(final)
    })
    
  }

  useEffect(() => {
    getManufacturer()
    
  }, [])

  return (
  
    <div className="App">    
       <SearchBar manuArr={manuArr}/>
    </div>
  );
}

export default App;
