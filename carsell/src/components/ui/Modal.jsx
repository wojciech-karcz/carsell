import ReactDOM from "react-dom"
import styles from "./Modal.module.css"

const Backdrop = props => {
    return (<div className={styles.backdrop} onClick={props.onBackdropClick} />)
}

const Overlay = props => {
    return (
        <div className={styles["overlay-container"]}>
            <div className={styles["overlay-content"]}>{props.children}</div>
        </div>
    )
}

const portal = document.querySelector('#modal')

const Modal = props => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onBackdropClick={props.onBackdropClick} />, portal)}
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portal)}
        </>
    )
}

export default Modal