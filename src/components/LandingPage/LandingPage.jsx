import './landingPage.css';
import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../context/AuthContext";
import { useState } from 'react';
import {BiSearch} from 'react-icons/bi'
import {MdPlace} from 'react-icons/md'
import Map from './Test';
import axios from 'axios';


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f5f5f5",
  },
});

export default function LandingPage() {
  const [input,setInput] = useState("");
  const [search,setSearch] = useState({
    input : "",
    scale: 0,
  })
  console.log(search);
  const [specialitie,setSpecialitie] = useState([]);
  const[map,setMap] = useState(false);
    

  const { user} = useContext(AuthContext)
  const classes = useStyles();
  
  useEffect(() => {
    getdoctor();
  }, [])


  

  const getdoctor = async ()=>{
    try {
      const {data} = await axios.get('http://188.121.113.74/api/doctor/specialties/')
      setSpecialitie(data);
    } catch (error) {
      console.log(error);
    }
  }

  const searchDoctor = () =>{
    console.log("search");
  }
  


  const inputHandler = (e) => {
    setSearch({
      ...search,
      input : e.target.value
    })
  }

  const changeHandler = (e) =>{
    setSearch({
      ...search,
      scale : e.target.value
    })
  }

  return (
    <>
    {map && <Map  /> }
        <div className={classes.root}>
      <NavBar />
      <div className="landingPage">
        <div className="searchBar">
          <div className="search">
            <input onChange={inputHandler} className="searchDoctor" type="text" placeholder="جستجوی پزشک   ..."/>
            <div className="IconSelect">
              <select onChange={(e) => changeHandler(e)} className='selectScale'>
              {specialitie &&
                specialitie.map((item,index) => (
                  <option key={index} value={item.id}>{item.name}</option>
              ))}
              </select>
              <div onClick={() => setMap(!map) } className='place'>
                <h6 >انتخاب مکان</h6>
                <button  className='placeIcon'>{<MdPlace/>}</button>
                
              </div>
              <button onClick={searchDoctor} className='searchIcon' >{<BiSearch/>}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}
