import React, { useState } from 'react';
import '../style/header.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';
import Cookies from 'js-cookie';
import { useNotification } from './Notification.tsx';

function Header() {
    const { user, setUser, setToken } = useAuth();
    const { addNotification } = useNotification();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        setUser("");
        setToken(null);
        Cookies.remove('userData');
        Cookies.remove('token');
        Cookies.remove('tokenExpiration');
        addNotification('success', 'Вы вышли из системы');
        toggleSidebar();
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={'mainBlock'}>
            <div className={'adaptive mainBlockGrid'}>
                <div className={'border_block item_logo'}>
                    <NavLink to="/users">
                        <img src={'../../oggetto-logo_tonal-hor-rus.png'} alt={'oggetto'}/>
                    </NavLink>
                </div>
                <div className={'border_block item_nav'}>
                    <NavLink to="/users"
                             className={({isActive}) => isActive ? "active" : undefined}>Сотрудники</NavLink>
                    <NavLink to="/teams" className={({isActive}) => isActive ? "active" : undefined}>Команды</NavLink>
                    <NavLink to="/tasks_list"
                             className={({isActive}) => isActive ? "active" : undefined}>Задачи</NavLink>
                    <NavLink to="/reports_list"
                             className={({isActive}) => isActive ? "active" : undefined}>Отчёты</NavLink>
                    <NavLink to="/vacation_list"
                             className={({isActive}) => isActive ? "active" : undefined}>Отпуска</NavLink>
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

                <div className={'sideBarHeader'}>
                    <img
                        src={'../../sidebar_menu.png'}
                        onClick={toggleSidebar}
                        alt="Меню"
                    />
                </div>
            </div>

            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <img
                    src={'../../close_sidebar.png'}
                    className="sidebar-close-icon"
                    onClick={toggleSidebar}
                />
                <div className={'sidebar_first_str'}></div>
                <NavLink to="/users" onClick={toggleSidebar}>Сотрудники</NavLink>
                <NavLink to="/teams" onClick={toggleSidebar}>Команды</NavLink>
                <NavLink to="/tasks_list" onClick={toggleSidebar}>Задачи</NavLink>
                <NavLink to="/reports_list" onClick={toggleSidebar}>Отчёты</NavLink>
                <NavLink to="/vacation_list" onClick={toggleSidebar}>Отпуска</NavLink>
                <div className={'border_block item_auth_sidebar'}>
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
            <div
                className={`overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
            ></div>
        </div>
    );
}

export default Header;
