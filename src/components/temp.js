import React, { useEffect, useState } from 'react';
import './style.css';
import Weathercard from './weathercard';

const Temp = () => {
    const [searchValue,setSearchValue]=useState("pune");

    const[tempInfo,setTempInfo]=useState({});

    const getWeatherInfo=async()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e41d3f62cb8f55bf5bd8afd883fb7e6f`;
            
            const res=await fetch(url);
            const data=await res.json();

            const {temp,humidity,pressure}=data.main;
            const {main:weathermood} = data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;
            const myNewWeatherInfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);


            console.log(temp);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        getWeatherInfo();
    },[]);

  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input type='search'
            placeholder='search...'
            autoFocus
            id='search'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            className='searchTerm'
            />
            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
        
      </div>
      {/* temp card*/}
      <Weathercard tempInfo={tempInfo}/>
      
    </>
  )
}

export default Temp
