import { useState, useEffect } from "react"
import styles from "./Filter.module.css"

export default function Filter({ listedCars,filterListedCars, clearFiltlers }) {

    let brands = [];
    const uniqueBrands = new Set();

    listedCars.forEach(car => {
        if (!uniqueBrands.has(car.brand)) {
            uniqueBrands.add(car.brand);
            brands.push(
                <option key={car.id} value={car.brand}>{car.brand}</option>
            );
        }
    });

    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [minYearInput, setMinYearInput] = useState("")
    const [maxYearInput, setMaxYearInput] = useState("")
    const [minMileageInput, setMinMileageInput] = useState("")
    const [maxMileageInput, setMaxMileageInput] = useState("")
    const [minPriceInput, setMinPriceInput] = useState("")
    const [maxPriceInput, setMaxPriceInput] = useState("")

    // display models to choose based on selected brand
    const [brandModels, setBrandModels] = useState("")
    useEffect(
        function displayBrandModels() {
            const filteredListedCars = listedCars.filter(car => car.brand === selectedBrand)
            setBrandModels(filteredListedCars.map(car =>
                (<option key={car.id} value={car.model}>{car.model}</option>)
            ))
           setSelectedModel("")
        }, [selectedBrand])


    const filterHandler = (event) => {
        event.preventDefault()
        const filterCredentials = { 
            selectedBrand: selectedBrand,
            selectedModel: selectedModel,
            minYear: minYearInput,
            maxYear: maxYearInput,
            minMileage: minMileageInput,
            maxMileage: maxMileageInput,
            minPriceInput: minPriceInput,
            maxPrice: maxPriceInput
        }
        filterListedCars(filterCredentials)
    }

    return <div className={styles.filter}>
        <h3>Czego szukasz?</h3>
        <form>
            <select onChange={event => setSelectedBrand(event.target.value)} value={selectedBrand}>
                <option value={""}>Wszystkie marki</option>
                {brands}
            </select>
            <select onChange={event => setSelectedModel(event.target.value)} value={selectedModel}>
                <option value={""}>Wszystkie modele</option>
                {brandModels}
            </select>
            <input type="number" min="1672" max={new Date().getFullYear()} placeholder="Rok Produkcji od" onChange={event => setMinYearInput(event.target.value)} value={minYearInput} />
            <input type="number" min="1672" max={new Date().getFullYear()} placeholder="Rok Produkcji do" onChange={event => setMaxYearInput(event.target.value)} value={maxYearInput} />

            <input type="number" step="10000" min="0" placeholder="Przebieg od" onChange={event => setMinMileageInput(event.target.value)} value={minMileageInput} />
            <input type="number" step="10000" min="0" placeholder="Przebieg do" onChange={event => setMaxMileageInput(event.target.value)} value={maxMileageInput} />

            <input type="number" step="1000" min="0" placeholder="Cena od" onChange={event => setMinPriceInput(event.target.value)} value={minPriceInput} />
            <input type="number" step="1000" min="0" placeholder="Cena do" onChange={event => setMaxPriceInput(event.target.value)} value={maxPriceInput}/>
            <button onClick={clearFiltlers}>Wyczyść filtry</button>
            <button onClick={filterHandler}>Szukaj</button>
        </form>
    </div>
}



