import styles from "./Banner.module.css"
import bannerImage from "../../img/background.jpg"
import Filter from "../Filter/Filter"

export default function Banner({listedCars, filterListedCars, clearFiltlers}) {
    return <div style={{backgroundImage: `url("${bannerImage}")` }} className={styles.banner}>
        <Filter listedCars={listedCars} filterListedCars={filterListedCars} clearFiltlers={clearFiltlers}/>
    </div>
}