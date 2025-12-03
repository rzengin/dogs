import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">
                        <span className="logo-icon">🐾</span>
                        Rintintin
                    </h3>
                    <p className="footer-description">
                        La plataforma líder en cuidado de mascotas en Uruguay.
                        Conectamos dueños responsables con cuidadores confiables.
                    </p>
                    <div className="footer-social">
                        <a href="#" className="social-link" aria-label="Facebook">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="social-link" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="social-link" aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Servicios</h4>
                    <ul className="footer-links">
                        <li><Link to="/search">Paseo de Perros</Link></li>
                        <li><Link to="/search">Cuidado en Casa</Link></li>
                        <li><Link to="/search">Guardería Canina</Link></li>
                        <li><Link to="/search">Hotel para Mascotas</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Empresa</h4>
                    <ul className="footer-links">
                        <li><Link to="/about">Sobre Nosotros</Link></li>
                        <li><Link to="/become-sitter">Ser Cuidador</Link></li>
                        <li><Link to="/safety">Seguridad</Link></li>
                        <li><Link to="/help">Centro de Ayuda</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Contacto</h4>
                    <ul className="footer-contact">
                        <li>
                            <Mail size={16} />
                            <span>hola@mascotasuruguay.com</span>
                        </li>
                        <li>
                            <Phone size={16} />
                            <span>+598 2XXX XXXX</span>
                        </li>
                        <li>
                            <MapPin size={16} />
                            <span>Montevideo, Uruguay</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p className="footer-copyright">
                        © 2024 Rintintin. Todos los derechos reservados.
                    </p>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacidad</Link>
                        <Link to="/terms">Términos</Link>
                        <Link to="/cookies">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
