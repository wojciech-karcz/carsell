import styles from './ListedCarItem.module.css'
import carIcon from '../../img/car.png'
import roadIcon from '../../img/road.png'
import moneyIcon from '../../img/money.png'

export default function ListedCarItem({ data, showCarDetails }) {
    return (
        <>
            <div className={styles['car-item']} onClick={() => { showCarDetails(data) }}>
                <div className={styles['car-item-header']}>
                    <p><img src={carIcon} alt="car icon" />{data.brand} {data.model} {data.productionYear}</p>
                    <p><img src={roadIcon} alt="car icon" />{data.mileage}km</p>
                    <p><img src={moneyIcon} alt="car icon" />{data.price}PLN</p>
                </div>
                <div className={styles['car-item-body']}>
                    <img src={`http://localhost:3001/${data.id}.jpg`} alt={`zdjęcie samochodu ${data.brand} ${data.model}`} />
                </div>
            </div>
        </>
    )
}