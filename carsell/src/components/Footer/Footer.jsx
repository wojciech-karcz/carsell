import styles from './Footer.module.css'
import facebookLogo from '../../img/facebook.png'
import instagramLogo from '../../img/instagram.png'
import tiktokLogo from '../../img/tiktok.png'
import youtubeLogo from '../../img/youtube.png'


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles["footer-links"]}>
                <div>
                    <h4>Carsell</h4>
                    <p>Pomoc</p>
                    <p>Kontakt</p>
                    <p>Reklama</p>
                    <p>Polityka prywatności</p>
                    <p>Polityka cookies</p>
                    <p>Reklama</p>
                    <p>Biuro prasowe</p>
                </div>

                <div>
                    <h4>Znajdź nas</h4>
                    <p><a href='https:/facebook.com' target='_blank' rel="noreferrer"><img src={facebookLogo} alt="facebook logo"></img>Facebook</a></p>
                    <p><a href='https:/instagram.com' target='_blank' rel="noreferrer"><img src={instagramLogo} alt="instagram logo"></img>Instagram</a></p>
                    <p><a href='https:/tiktok.com' target='_blank' rel="noreferrer"><img src={tiktokLogo} alt="tiktok logo"></img>TikTok</a></p>
                    <p><a href='https:/youtube.com' target='_blank' rel="noreferrer"><img src={youtubeLogo} alt="youtube logo"></img>YouTube</a></p>
                </div>



                <div>
                    <h4>Obsługa Klienta</h4>
                    <p>Telefon: +48 61 880 32 21</p>
                    <p>Email: pomoc@carsell.pl</p>
                </div>



                <div>
                    <h4>Przydatne Informacje</h4>
                    <p>Cennik dla Klientów Indywidualnych</p>
                    <p>Cennik dla Klientów Biznesowych</p>
                    <p>Testy samochodów</p>
                    <p>Internetowy Samochód Roku</p>
                    <p>Ważne informacje</p>
                    <p>Kariera</p>
                    <p>Mapa kategorii</p>
                    <p>Mapa miejscowości</p>
                </div>

                <div>
                    <h4>Usługi i narzędzia</h4>
                    <p>Umowa kupna sprzedaży</p>
                    <p>Ile jest wart Twój samochód?</p>
                    <p>Finansowanie na Carsell</p>
                </div>
            </div>

            <div className={styles["footer-bottom"]}>
                Developed by Wojciech Karcz
            </div>
        </footer>
    )

}