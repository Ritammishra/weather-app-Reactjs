import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./style.css"
export const Home = () => {
    const [data, setData] = useState({
        celcious: 17,
        name: 'London',
        humidity: 10,
        speed: 2,
        Image: 'https://res.cloudinary.com/dviuwar22/image/upload/v1690828677/clouds_vgjnsk.png'
    })
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const handleClick = () => {
        if (name !== '') {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cb9d2524b1a294627bd8d540696b140e&&units=metric`
            axios.get(url)
            .then(res => {
                let imagePath = ''
                if (res.data.weather[0].main == "Clouds") {
                    imagePath = "https://res.cloudinary.com/dviuwar22/image/upload/v1690828677/clouds_vgjnsk.png"
                }else if (res.data.weather[0].main == "Clear") {
                    imagePath = "https://res.cloudinary.com/dviuwar22/image/upload/v1690828677/clear_acttfm.png"
                }else if (res.data.weather[0].main == "Rain") {
                    imagePath = "https://res.cloudinary.com/dviuwar22/image/upload/v1690828678/rain_xsk06q.png"
                }else if (res.data.weather[0].main == "Drizzle") {
                    imagePath = "https://res.cloudinary.com/dviuwar22/image/upload/v1690828678/rain_xsk06q.png"
                }else if (res.data.weather[0].main == "Haze") {
                    imagePath = "https://res.cloudinary.com/dviuwar22/image/upload/v1690828677/clouds_vgjnsk.png"
                }else if (res.data.weather[0].main == "Mist") {
                    imagePath = "https://res.cloudinary.com/dviuwar22/image/upload/v1690828678/mist_zps17j.png"
                }else{
                    imagePath = "https://res.cloudinary.com/dviuwar22/image/upload/v1690828677/clouds_vgjnsk.png"
                }
                setData({...data, celcious: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity,
                speed: res.data.wind.speed, Image: imagePath})
            })
            .catch(err => {
                if (err.response.status == 404) {
                    setError("Invalid City Name")
                }else{
                    setError('');
                }
                console.log(err)
            })
        }
    }
  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter location' onChange={e => setName(e.target.value)}/>
                <button onClick={handleClick}><img src='https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png'/></button>
            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div className='winfo'>
                <img src={data.Image} />
                <h1>{Math.round(data.celcious)}°C</h1>
                <h2>{data.name}</h2>
                <div className='wrapper'>
                <div className='details'>
                    <img src='https://res.cloudinary.com/dviuwar22/image/upload/v1690828678/humidity2_hbtbtq.png' />
                    <div className='col'>
                    <div className='humidity'>
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                    </div>
                    </div>
                </div>
                <div className='details'>
                    <img src='https://res.cloudinary.com/dviuwar22/image/upload/v1690828679/wind_cjhdx7.png' />
                    <div className='col'>
                    <div className="wind">
                    <p>{Math.round(data.speed)} km/h</p>
                    <p>Wind</p>
                    </div>
                    
                    </div>
                </div>
                </div>
                
            </div>
        </div>

    </div>
  )
}
