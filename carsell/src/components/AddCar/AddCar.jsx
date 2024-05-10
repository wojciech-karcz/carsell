import Modal from "../ui/Modal"
import styles from "./AddCar.module.css"
import "../../index.css"
import { useState } from "react"

export default function AddCar({ closeForm, updateFetchedData }) {
    const [brandInput, setBrandInput] = useState("")
    const [modelInput, setModelInput] = useState("")
    const [productionYearInput, setProductionYearInput] = useState("")
    const [mileageInput, setMileageInput] = useState("")
    const [fuelTypeInput, setFuelTypeInput] = useState("")
    const [bodyTypeInput, setbodyTypeInput] = useState("")
    const [engineSizeInput, setEngineSizeInput] = useState("")
    const [engineHorsepowerInput, setEngineHorsepowerInput] = useState("")
    const [priceInput, setPriceInput] = useState("")
    const [allowPriceNegotiationInput, setAllowPriceNegotiationInput] = useState(true)
    const [descriptionInput, setDescriptionInput] = useState("")
    const [imageInput, setImageInput] = useState(null)

    async function uploadImage() {
        if (!imageInput) {
            console.log("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageInput);

        try {
            const response = await fetch("http://localhost:3001/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            console.log("Image uploaded successfully");
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleSubmitForm(event) {
        event.preventDefault();
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        console.log("logged user:")
        console.log(loggedUser)

        const userInput = {
            brand: brandInput,
            model: modelInput,
            productionYear: productionYearInput,
            mileage: mileageInput,
            fuelType: fuelTypeInput,
            bodyType: bodyTypeInput,
            engineSize: engineSizeInput,
            engineHorsepower: engineHorsepowerInput,
            price: priceInput,
            allowNegotiation: allowPriceNegotiationInput,
            description: descriptionInput,
            userId: loggedUser.id,
            userName: loggedUser.name,
            userPhone: loggedUser.phone
        }
        
        console.log(userInput)

        async function updateCarList(newCar) {
            const response = await fetch("http://localhost:3001/cars", {
                method: "PUT",
                body: JSON.stringify({ newCar }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const resData = await response.json()

            if (!response.ok) {
                throw new Error("Błąd podczas wysyłania danych")
            }

            return resData.message
        }

        await updateCarList(userInput)
        uploadImage()
        updateFetchedData()
    }

    return (
        <Modal>
            <form className={styles["add-car"]}>
                <button className="close-button" onClick={closeForm}>X</button>
                <h1>Wystaw samochód</h1>

                <div className={styles["inputs-wrapper"]}>
                    <div className={styles["small-inputs-wrapper"]}>
                        <p>
                            <label htmlFor="brand-input">Marka:</label>
                            <input type="text" id="brand-input" required onChange={event => { setBrandInput(event.target.value) }} value={brandInput} />
                        </p>

                        <p>
                            <label htmlFor="brand-input">Model:</label>
                            <input type="text" id="brand-input" required onChange={event => { setModelInput(event.target.value) }} value={modelInput} />
                        </p>

                        <p>
                            <label htmlFor="productionYear-input">Rok Produkcji:</label>
                            <input type="number" id="productionYear-input" required onChange={event => { setProductionYearInput(event.target.value) }} value={productionYearInput} />
                        </p>

                        <p>
                            <label htmlFor="mileage-input">Przebieg:</label>
                            <input type="number" id="mileage-input" min={1} required onChange={event => { setMileageInput(event.target.value) }} value={mileageInput} />
                        </p>

                        <p>
                            <label htmlFor="fuelType-input">Typ paliwa:</label>
                            <select onChange={event => { setFuelTypeInput(event.target.value) }} value={fuelTypeInput}>
                                <option value={"Benzyna"}>Benzyna</option>
                                <option value={"Benzyna+LPG"}>Benzyna+LPG</option>
                                <option value={"LPG"}>LPG</option>
                                <option value={"Diesel"}>Diesel</option>
                                <option value={"Elektryczne"}>Elektryczne</option>
                            </select>
                        </p>

                        <p>
                            <label htmlFor="bodyType-input">Typ nadwozia:</label>
                            <select onChange={event => { setbodyTypeInput(event.target.value) }} value={bodyTypeInput}>
                                <option value={"Hatchback"}>Hatchback</option>
                                <option value={"Sedan"}>Sedan</option>
                                <option value={"Kombi"}>Kombi</option>
                                <option value={"SUV"}>SUV</option>
                                <option value={"Coupe"}>Coupe</option>
                            </select>
                        </p>

                        <p>
                            <label htmlFor="price-input">Pojemnoność silnika:</label>
                            <input type="number" id="price-input" min={1} max={.1} required onChange={event => { setEngineSizeInput(event.target.value) }} value={engineSizeInput} />
                        </p>

                        <p>
                            <label htmlFor="price-input">Moc silnika:</label>
                            <input type="number" id="price-input" min={1} required onChange={event => { setEngineHorsepowerInput(event.target.value) }} value={engineHorsepowerInput} />
                        </p>

                        <p>
                            <label htmlFor="price-input">Cena:</label>
                            <input type="number" id="price-input" required onChange={event => { setPriceInput(event.target.value) }} value={priceInput} />
                        </p>

                        <p>
                            <label htmlFor="price-input">Możliwość negocjacji:</label>
                            <select onChange={event => { setAllowPriceNegotiationInput(event.target.value) }} value={allowPriceNegotiationInput}>
                                <option value={true}>Cena do negocjacji</option>
                                <option value={false}>Cena odstateczna</option>
                            </select>
                        </p>
                    </div>

                    <label htmlFor="description-input">Opis:</label>
                    <textarea id="description-input" maxLength={400} required onChange={event => { setDescriptionInput(event.target.value) }} value={descriptionInput} />

                    <label htmlFor="image-input">Zdjęcie:</label>
                    <input type="file" id="image-input" accept="image/jpg" required onChange={event => { setImageInput(event.target.files[0]) }} />
                </div>
                <button type="submit" onClick={handleSubmitForm}>Wystaw na sprzedaż</button>
            </form>
        </Modal>
    )
}