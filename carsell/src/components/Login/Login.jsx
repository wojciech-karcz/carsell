import { useState } from "react"
import styles from "./Login.module.css"
import Modal from "../ui/Modal"

export default function Register({ closeLogin, handleLogin }) {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [loginMessage, setLoginMessage] = useState('')

    async function handleSubmitForm(event) {
        event.preventDefault();

        const loginCredentials = {
            email: emailInput,
            password: passwordInput
        }

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "PUT",
                body: JSON.stringify({ loginCredentials }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Błąd podczas wysyłania danych");
            }

            const resData = await response.json();
            setLoginMessage(resData.message);
            localStorage.setItem("loggedUser", JSON.stringify(resData.user))
            handleLogin()

        } catch (error) {
            setLoginMessage("Error:", error.message);
        }
    }

    return (
        <Modal>
            <button className="close-button" onClick={closeLogin}>X</button>
            <form className={styles["login-form"]}>
            <h1>Zaloguj się</h1>
                <p>
                    <label htmlFor="email">Adres email:</label>
                    <input type="email" id="email" name="email" required value={emailInput} onChange={(event) => setEmailInput(event.target.value)} />
                </p>

                <p>
                    <label htmlFor="password">Hasło:</label>
                    <input type="password" id="password" name="password" required value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} />
                </p>

                <button type="submit" onClick={handleSubmitForm}>Zaloguj</button>
                <p>Masz jeszcze konta?</p>

                <p>{loginMessage}</p>
            </form>
        </Modal>
    )
}