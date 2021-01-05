import React from 'react'
import Loader from '../Loader/Loader'
import './WeatherDisplay.css'

class WeatherDisplay extends React.Component {

    state = {
        weatherData: null,
        isLoaded: false
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state === prevState) {
            this.setState({
                isLoaded: false
            })
        }

        if (this.props !== prevProps) {
            this.loadData()
        }
    }

    loadData = () => {
        const { zipCode } = this.props
        const url = `http://api.openweathermap.org/data/2.5/weather?id=${ zipCode }&lang=ru&appid=36955bda0a32c474b99cd126157674fd&units=metric`

        fetch(url)
            .then(response => response.json())
            .then(body => this.setState({
                weatherData: body,
                isLoaded: true
            }))
    }

    getTemp = () => {
        return Math.floor((this.state.weatherData.main.temp))
    }

    render() {
        if (!this.state.weatherData || !this.state.isLoaded) {
            return <Loader />
        }

        const city = this.state.weatherData.name
        const description = this.state.weatherData.weather[0].description
        const windSpeed = this.state.weatherData.wind.speed
        const img = this.state.weatherData.weather[0].icon
        const imgUrl = `http://openweathermap.org/img/w/${ img }.png`

        return (
            <div>
                <h1>Сейчас в городе { city } { description } </h1>
                <div className="detail">
                    <p>Температура воздуха { this.getTemp() }&deg; C</p>
                    <p>Скорость ветра { windSpeed } м/с</p>
                </div>
                <img src={ imgUrl } alt="weather-icon" />
            </div>
        )
    }
}

export default WeatherDisplay