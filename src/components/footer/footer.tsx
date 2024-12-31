import './footer.css'


const Footer = () => (
  <footer className="footer">
    <a href="/home" className="footer-icon"><img src="src\assets\images\speedometer.svg" alt="Speedomete Icon" className="footer-icon" /></a>
    <a href="/libros" className="footer-icon"><img src="src\assets\images\books.svg" alt="Books Icon" className="footer-icon" /></a>
    <a href="/autores" className="footer-icon"><img src="src\assets\images\user-rectangle.svg" alt="Author Icon" className="footer-icon" /></a>
    <a href="/logout" className="footer-icon"><img src="src\assets\images\sign-out.svg" alt="Sign Out Icon" className="footer-icon" /></a>
  </footer>
)

export default Footer;