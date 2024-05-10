import styles from "./ListedCars.module.css"
import CarItem from "../ListedCarItem/ListedCarItem"
import ListedCarDetails from "../ListedCarDetails/ListedCarDetails"
import { useState } from "react"

export default function ListedCars(props) {
    const [showingCarDetails, setShowingCarDetails] = useState(false)
    const [carDetails, setCarDetails] = useState({})

    const closeCarDetails = () => {
        document.body.classList.remove("modal-open")
        setShowingCarDetails(false)
    }

    const showCarDetails = data => {
        document.body.classList.add("modal-open")
        setCarDetails(data)
        setShowingCarDetails(true)
    }

    if (props.error) {
        return (
            <>
                <p>Podczas wczytywania wystawionych samochodów wystąpił błąd:</p>
                <p>{props.error.message}</p>
            </>
        )
    }

    return (
        <>
            <div className={styles['listed-cars']}>
                <h2>Dostępne samochody</h2>
                <div className={styles['listed-cars-wrapper']}>
                    {props.isFetching && <p>Wczytywanie...</p>}
                    {props.listedCars.map(car => (
                        <CarItem data={car} key={car.id} showCarDetails={showCarDetails} />
                    ))}
                </div>
            </div>
            {showingCarDetails && <ListedCarDetails data={carDetails} close={closeCarDetails} />}
        </>
    )
}