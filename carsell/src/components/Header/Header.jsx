import styles from "./Header.module.css"
import { useState, useEffect } from "react"
import AddCar from "../AddCar/AddCar"
import Register from "../Register/Register"
import Login from "../Login/Login"

export default function Header({ updateFetchedData, updateFilteredCars }) {
    const [addCarActive, setAddCarActive] = useState(false)
    const [registerActive, setRegisterActive] = useState(false)
    const [loginActive, setLoginActive] = useState(false)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    // closing modal from insidee of component
    const handleCloseForm = () => { document.body.classList.remove("modal-open"); setAddCarActive(false) }
    const handleCloseRegister = () => { document.body.classList.remove("modal-open"); setRegisterActive(false) }
    const handleCloseLogin = () => { document.body.classList.remove("modal-open"); setLoginActive(false) }
    const handleSuccesfulLogin = () => { setIsUserLoggedIn(true) }
    
    // logout
    const handleLogout = () => {setIsUserLoggedIn(false); localStorage.removeItem("loggedUser")}
    
    // cheking if user is logged
    useEffect(() => {if (localStorage.getItem("loggedUser") !== null) setIsUserLoggedIn(true)},[])

    // opening AddCar is user is logged in and if not, openning Login
    const handleOpenAddCar = () => {
        document.body.classList.add("modal-open")
        if (isUserLoggedIn) setAddCarActive(true)
        if (!isUserLoggedIn) setRegisterActive(true)
    }

    const openMyListedCars = () => {
        const user = JSON.parse(localStorage.getItem("loggedUser"))
        console.log(user)
        updateFilteredCars(user)
    }

    return (
        <div className={styles.header}>
            <h1>Carsell</h1>
            <div>
                {isUserLoggedIn ? 
                    ( <>
                        <p onClick={openMyListedCars}>Moje ogłoszenia</p>
                        <p onClick={handleLogout}>Wyloguj</p>
                    </>)
                    : (<>
                        <p onClick={() => { document.body.classList.add("modal-open"); setLoginActive(true) }}>Zaloguj się</p>
                        <p onClick={() => { document.body.classList.add("modal-open"); setRegisterActive(true) }}>Zarejestruj się</p>
                    </>)
                }

                <button onClick={handleOpenAddCar}>Wystaw samochód!</button>
            </div>
            {addCarActive && <AddCar closeForm={handleCloseForm} updateFetchedData={updateFetchedData} />}
            {registerActive && <Register closeRegister={handleCloseRegister} />}
            {loginActive && <Login closeLogin={handleCloseLogin} handleLogin={handleSuccesfulLogin} />}
        </div>
    )
}