import React from 'react'
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay'
import './App.css'

class App extends React.Component {

    places = [
        { name: "Санкт-Петербург", zip: "498817" },
        { name: "Москва", zip: "524901" },
        { name: "Екатеринбург", zip: "1486209" },
        { name: "Курган", zip: "1501321" },
        { name: "Якутск", zip: "2013159" },
    ]

    state = {
        activePlace: 0
    }

    renderButtons(places) {
        return places.map((item, index) => {

            let clazz = 'btn btn-danger m-2 mt-5 mb-5'

            // подсвечиваем кнопку с выбранным городом
            if (index === this.state.activePlace) {
                clazz = 'btn btn-success m-2 mt-5 mb-5'
            }
                return (
                    <button className={ clazz }
                            key={ item.zip }
                            onClick={ () => this.setActivePlace(index) }>
                            { item.name }
                    </button>
                )
            }
        )
    }

    setActivePlace = (index) => {
        this.setState({
            activePlace: index
        })
    }

    render() {
        const { activePlace } = this.state
        const zipCode = this.places[activePlace].zip
        const buttons = this.renderButtons(this.places)

        return (
            <div className="app container">
                { buttons }
                <WeatherDisplay zipCode={ zipCode } />
            </div>
        )
    }
}

export default App