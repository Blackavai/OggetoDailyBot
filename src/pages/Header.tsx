import '../style/header.css';

import { NavLink } from 'react-router-dom';

function Header(){
    return(
        <div className={'mainBlock mainBlockGrid'}>
            <div className={'border_block item_logo'}>
                <NavLink to="/"><img src={'../../public/oggetto-logo_mono-light-hor-rus.png'} alt={'oggetto'}/></NavLink>
            </div>
            <div className={'border_block item_nav'}>
                <NavLink to="/users">Сотрудники</NavLink>
                <NavLink to="/teams">Команды</NavLink>
                <NavLink to="/tasks_list">Задачи</NavLink>
                <NavLink to="/reports_list">Отчёты</NavLink>
                <NavLink to="/reports_list">Отпуска</NavLink>
            </div>
            <div className={'border_block item_auth'}>
                <NavLink to="/login">Авторизация</NavLink>
            </div>

        </div>
    );
}

export default Header;