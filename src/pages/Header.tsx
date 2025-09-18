import '../style/header.css';

import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';
import Cookies from 'js-cookie';
import { useNotification } from './Notification.tsx';

function Header(){
    const { user, setUser, setToken } = useAuth();
    const { addNotification } = useNotification();

    const handleLogout = () => {
        setUser(null); // Очищаем пользователя
        setToken(null); // Очищаем токен
        Cookies.remove('userData'); // Удаляем куки пользователя
        Cookies.remove('token'); // Удаляем куки токена
        Cookies.remove('tokenExpiration'); // Удаляем куки времени истечения токена
        addNotification('success', 'Вы вышли из системы');
    };

    return(
        <div className={'mainBlock mainBlockGrid'}>
            <div className={'border_block item_logo'}>
                <NavLink to="/users" className={''}><img src={'../../oggetto-logo_tonal-hor-rus.png'}
                                                         alt={'oggetto'}/></NavLink>
            </div>
            <div className={'border_block item_nav'}>
                <NavLink to="/users" className={({isActive}) =>
                    isActive ? "active" : undefined
                }>Сотрудники</NavLink>
                <NavLink to="/teams" className={({isActive}) =>
                    isActive ? "active" : undefined
                }>Команды</NavLink>
                <NavLink to="/tasks_list" className={({isActive}) =>
                    isActive ? "active" : undefined
                }>Задачи</NavLink>
                <NavLink to="/reports_list" className={({isActive}) =>
                    isActive ? "active" : undefined
                }>Отчёты</NavLink>
                <NavLink to="/vacation_list" className={({isActive}) =>
                    isActive ? "active" : undefined
                }>Отпуска</NavLink>
            </div>
            <div className={'border_block item_auth'}>
                {user ? (
                    <>
                        <span>{user.fname} {user.lname}</span>
                        <img
                            src={'../../exitButton.png'}
                            alt="Выход"
                            style={{cursor: 'pointer'}}
                            onClick={handleLogout}
                            className={'btnInteractive'}
                        />
                    </>
                ) : (
                    <></>
                )}
         </div>

</div>
)
    ;
}

export default Header;