import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./style.css"
export const Home = () => {
    const [data, setData] = useState({
        celcious: 17,
        name: 'London',
        humidity: 10,
        speed: 2,
        Image: '/images/clouds.png'
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
                    imagePath = "/images/clouds.png"
                }else if (res.data.weather[0].main == "Clear") {
                    imagePath = "/images/clear.png"
                }else if (res.data.weather[0].main == "Rain") {
                    imagePath = "/images/rain.png"
                }else if (res.data.weather[0].main == "Drizzle") {
                    imagePath = "/images/drizzle.png"
                }else if (res.data.weather[0].main == "Haze") {
                    imagePath = "/images/clouds.png"
                }else if (res.data.weather[0].main == "Mist") {
                    imagePath = "/images/mist.png"
                }else{
                    imagePath = "/images/clouds.png"
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
                    <img src='/images/humidity2.png' />
                    <div className='col'>
                    <div className='humidity'>
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                    </div>
                    </div>
                </div>
                <div className='details'>
                    <img src='/images/wind.png' />
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
