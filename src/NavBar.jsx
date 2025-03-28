import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">index page</NavLink>
                </li>
                <li>
                    <NavLink to="/users">users</NavLink>
                </li>
                <li>
                    <NavLink to="/header">header</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;