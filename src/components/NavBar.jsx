import { Link } from "react-router-dom"
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className="navbar">
            <h2>
                <Link to={'/'}>  Torfresma Social Book</Link>
            </h2>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/newPost'} className="new-btn"> Novo Post </Link>
                </li>
                <li>
                    <Link to={'/cadastro'}>Usuário</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar