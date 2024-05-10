import { useState } from "react"
import Modal from "../ui/Modal"
import styles from "./ListedCarDetails.module.css"

export default function ListedCarDetails({ data, close }) {
    const [showingPhoneNumber, setShowingPhoneNumber] = useState(false)

    return (
        <Modal>
            <div className={styles["listed-car-container"]}>
                <h1>{`${data.brand} ${data.model} ${data.productionYear}`}</h1>
                <button className={"close-button"} onClick={close}>X</button>
                <div className={styles["listed-car"]}>
                    <div className={styles["listed-car-img"]}>
                        <img src={`http://localhost:3001/${data.id}.jpg`} alt={`Zdjęcie samochodu ${data.brand} ${data.model}`} />
                    </div>
                    <div className={styles["listed-car-details"]}>
                        <div className={styles["listed-car-details-specs"]}>
                            <h4>Specyfikacja</h4>
                            <p>Marka: {data.brand}</p>
                            <p>Model: {data.model}</p>
                            <p>Rok produkcji: {data.productionYear}</p>
                            <p>Przebieg: {data.mileage}km</p>
                            <p>Paliwo: {data.fuelType}</p>
                            <p>Typ nadwozia: {data.bodyType}</p>
                            <p>Pojemność silnika: {data.engineSize}l</p>
                            <p>Moc silnika: {data.engineHorsepower}km</p>
                        </div>

                        <div className={styles["listed-car-details-desc"]}>
                            <h4>Opis</h4>
                            <p>{data.description}</p>
                        </div>


                        <div className={styles["listed-car-details-seller"]}>
                            <h4>Sprzedający</h4>
                            {data.userName}
                            <div className={styles[`phone-number-${showingPhoneNumber===true ? "shown" : "hidden"}`]} onClick={() => {setShowingPhoneNumber(true)}}>
                                {showingPhoneNumber ? (data.userPhone): "*Pokaż numer telefonu*"}
                            </div>
                        </div>

                        <p><b>Cena: {data.price}zł</b> - {data.allowNegotiation === true ? "Do negocjacji" : "Cena ostateczna"}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}