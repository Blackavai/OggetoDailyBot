import '../style/header.css';

import { NavLink } from 'react-router-dom';

function Header(){
    return(
        <div className={'mainBlock mainBlockGrid'}>
            <div className={'border_block item_logo'}>
                <NavLink to="/users" className={''}><img src={'../../public/oggetto-logo_tonal-hor-rus.png'} alt={'oggetto'}/></NavLink>
            </div>
            <div className={'border_block item_nav'}>
                <NavLink to="/users" className={({ isActive }) =>
                    isActive ? "active" : undefined
                }>Сотрудники</NavLink>
                <NavLink to="/teams" className={({ isActive }) =>
                    isActive ? "active" : undefined
                }>Команды</NavLink>
                <NavLink to="/tasks_list" className={({ isActive }) =>
                    isActive ? "active" : undefined
                }>Задачи</NavLink>
                <NavLink to="/reports_list" className={({ isActive }) =>
                    isActive ? "active" : undefined
                }>Отчёты</NavLink>
                <NavLink to="/vacation_list" className={({ isActive }) =>
                    isActive ? "active" : undefined
                }>Отпуска</NavLink>
            </div>
            <div className={'border_block item_auth'}>
                <NavLink to="/login">Имя пользователя</NavLink>
                <img src={'../../public/exitButton.png'}/>
            </div>

        </div>
    );
}

export default Header;