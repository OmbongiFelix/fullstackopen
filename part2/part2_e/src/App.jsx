import { useEffect, useState } from 'react'
import axios from 'axios'

const REST_COUNTRIES_URL =
  'https://studies.cs.helsinki.fi/restcountries/api/all'

const WEATHER_URL =
  'https://api.openweathermap.org/data/2.5/weather'

const Name = ({ country, onShow }) => {
  return (
    <li>
      {country.name.common}{' '}
      <button onClick={() => onShow(country)}>
        show
      </button>
    </li>
  )
}

const Country = ({ country, weather }) => {
  const languages = Object.values(country.languages || {})
  const capital = country.capital?.[0] || 'Unknown'

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>
        capital {capital}
        <br />
        area {country.area}
      </p>

      <h2>Languages</h2>

      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags?.png}
        alt={`Flag of ${country.name.common}`}
        width="200"
      />

      {weather && (
        <div>
          <h2>Weather in {capital}</h2>

          <p>
            Temperature {weather.main.temp} °C
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />

          <p>{weather.weather[0].description}</p>

          <p>
            Wind {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  )
}

const Filter = ({ value, allCountries, onShow }) => {
  const matches = allCountries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(value.toLowerCase())
  )

  if (value === '') {
    return null
  }

  if (matches.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (matches.length === 1) {
    return null
  }

  return (
    <ul>
      {matches.map(match => (
        <Name
          key={match.cca3}
          country={match}
          onShow={onShow}
        />
      ))}
    </ul>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] =
    useState(null)
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_SOME_KEY

  // Fetch countries once
  useEffect(() => {
    axios
      .get(REST_COUNTRIES_URL)
      .then(response => {
        setAllCountries(response.data)
      })
      .catch(error => {
        console.error(
          'Error fetching countries:',
          error
        )
      })
  }, [])

  // Automatically select country when exactly one match exists
  useEffect(() => {
    if (!value) {
      setSelectedCountry(null)
      return
    }

    const matches = allCountries.filter(country =>
      country.name.common
        .toLowerCase()
        .includes(value.toLowerCase())
    )

    if (matches.length === 1) {
      setSelectedCountry(matches[0])
    } else {
      setSelectedCountry(null)
    }
  }, [value, allCountries])

  // Fetch weather
  useEffect(() => {
    if (!selectedCountry || !apiKey) {
      setWeather(null)
      return
    }

    const capital =
      selectedCountry.capital?.[0]

    if (!capital) {
      return
    }

    axios
      .get(WEATHER_URL, {
        params: {
          q: capital,
          appid: apiKey,
          units: 'metric'
        }
      })
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error(
          'Error fetching weather:',
          error
        )
        setWeather(null)
      })
  }, [selectedCountry, apiKey])

  const handleChange = event => {
    setValue(event.target.value)
  }

  const showCountry = country => {
    setSelectedCountry(country)
    setValue(country.name.common)
  }

  return (
    <div>
      <h1>Country Search</h1>

      <div>
        find countries:{' '}
        <input
          value={value}
          onChange={handleChange}
        />
      </div>

      {selectedCountry ? (
        <Country
          country={selectedCountry}
          weather={weather}
        />
      ) : (
        <Filter
          value={value}
          allCountries={allCountries}
          onShow={showCountry}
        />
      )}
    </div>
  )
}

export default App
