import { useState } from "react"
import styles from "./Register.module.css"
import Modal from "../ui/Modal"

export default function Register({ closeRegister }) {
    const [nameInput, setNameInput] = useState('')
    const [surnameInput, setSurnameInput] = useState('')
    const [phoneInput, setPhoneInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [registerMessage, setRegisterMessage] = useState('')

    async function handleSubmitForm(event) {
        event.preventDefault();

        const newUser = {
            name: nameInput,
            surname: surnameInput,
            phone: phoneInput,
            email: emailInput,
            password: passwordInput
        };

        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "PUT",
                body: JSON.stringify({ newUser }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const resData = await response.json();
            setRegisterMessage(resData.message);  // Log the response message

        } catch (error) {
            console.error("Error:", error.message);
        }
    }


    return (
        <Modal>
            <button className="close-button" onClick={closeRegister}>X</button>
            <form className={styles["register-form"]}>
                <h1>Zarejestruj się</h1>
                <p>
                    <label htmlFor="name">Imię:</label>
                    <input type="text" id="name" name="name" required value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
                </p>

                <p>
                    <label htmlFor="surname">Nazwisko:</label>
                    <input type="text" id="surname" name="surname" required value={surnameInput} onChange={(event) => setSurnameInput(event.target.value)} />
                </p>

                <p>
                    <label htmlFor="phone">Numer telefonu:</label>
                    <input type="tel" id="phone" name="phone" required value={phoneInput} onChange={(event) => setPhoneInput(event.target.value)} />
                </p>

                <p>
                    <label htmlFor="email">Adres email:</label>
                    <input type="email" id="email" name="email" required value={emailInput} onChange={(event) => setEmailInput(event.target.value)} />
                </p>

                <p>
                    <label htmlFor="password">Hasło:</label>
                    <input type="password" id="password" name="password" required value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} />
                </p>

                <button type="submit" onClick={handleSubmitForm}>Zarejestruj</button>
                <p>Masz już konto?</p>

                <p>{registerMessage}</p>
            </form>
        </Modal>
    )
}

