import { useState, useEffect } from "react"
import Header from "./components/Header/Header"
import Banner from "./components/Banner/Banner"
import ListedCars from "./components/ListedCars/ListedCars"
import Footer from "./components/Footer/Footer"

function App() {
  const [listedCars, setListedCars] = useState([])
  const [filteredListedCars, setFilteredListedCars] = useState([])
  const [isListedCarsFiltered, setIsListedCarsFiltered] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState()

  async function fetchCars() {
    setIsFetching(true)
    try {
      const response = await fetch("http://localhost:3001/cars")
      const resData = await response.json()
      if (!response.ok) throw new Error("failed to fetch cars")
      setListedCars(resData.cars)
    } catch (error) {
      setError(error)
    }
    setIsFetching(false)
  }

  useEffect(() => { fetchCars() }, [])

  function updateFetchedData() { fetchCars() }

  function filterListedCars(filterCredentials) {
    const filteredCars = listedCars.filter(car => {
      return ((filterCredentials.selectedBrand === "" || car.brand === filterCredentials.selectedBrand) &&
        (filterCredentials.selectedModel === "" || car.model === filterCredentials.selectedModel) &&
        (filterCredentials.minYear === "" || car.year >= parseInt(filterCredentials.minYear)) &&
        (filterCredentials.maxYear === "" || car.year <= parseInt(filterCredentials.maxYear)) &&
        (filterCredentials.minMileage === "" || car.mileage >= parseInt(filterCredentials.minMileage)) &&
        (filterCredentials.maxMileage === "" || car.mileage <= parseInt(filterCredentials.maxMileage)) &&
        (filterCredentials.minPriceInput === "" || car.price >= parseInt(filterCredentials.minPriceInput)) &&
        (filterCredentials.maxPrice === "" || car.price <= parseInt(filterCredentials.maxPrice))
      )
    })

    setFilteredListedCars(filteredCars)
    setIsListedCarsFiltered(true)
  }

  function clearFiltlers() { setIsListedCarsFiltered(false) }

  function updateFilteredCars(user) { 
    const usersCars = listedCars.filter(car => car.userID === user.id)
    setFilteredListedCars(usersCars)
    setIsListedCarsFiltered(true)
  }


  return (
    <>
      <Header updateFetchedData={updateFetchedData} updateFilteredCars={updateFilteredCars}/>
      <Banner listedCars={listedCars} filterListedCars={filterListedCars} clearFiltlers={clearFiltlers}/>
      <ListedCars listedCars={(isListedCarsFiltered === true && filterListedCars.length > 0) ? filteredListedCars : listedCars} isFetching={isFetching} error={error} />
      <Footer />
    </>
  )
}

export default App