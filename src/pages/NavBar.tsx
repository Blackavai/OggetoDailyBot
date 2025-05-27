import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">index page</NavLink>
                </li>
                <li>
                    <NavLink to="/login">login page</NavLink>
                </li>
                <li>
                    <NavLink to="/users">users</NavLink>
                </li>
                <li>
                    <NavLink to="/teams">teams page</NavLink>
                </li>
                <li>
                    <NavLink to="/team_edit">team edit page</NavLink>
                </li>
                <li>
                    <NavLink to="/tasks_list">tasks page</NavLink>
                </li>
                <li>
                    <NavLink to="/new_task">new task</NavLink>
                </li>
                <li>
                    <NavLink to="/reports_list">report list page</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;