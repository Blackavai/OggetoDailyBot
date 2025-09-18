import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext.tsx';
import '../style/login.css';
import kevin from '../assets/kevinLogin.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './Notification.tsx';

const LoginPage: React.FC = () => {
    const { setUser, setToken } = useAuth();
    const [tg_id, setTgId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Создаем экземпляр navigate
    const { addNotification } = useNotification();

    const authFunc = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { tg_id, password }, { withCredentials: true });
            const token = response.data.user.token; // Измените путь к токену

            if (!token) {
                throw new Error("Токен не получен");
            }

            setUser(response.data.user); // Обновляем пользователя
            setToken(token); // Обновляем токен
            Cookies.set('token', token); // Сохраняем токен в куках
            Cookies.set('userData', JSON.stringify(response.data.user)); // Сохраняем данные пользователя
            addNotification('success', 'Вы вошли в систему');

            // Перенаправляем на нужную страницу после успешной авторизации
            navigate('/users'); // Замените '/users' на нужный маршрут
        } catch (error) {
            console.log('Ошибка авторизации', error.response ? error.response.data : error.message);
            addNotification('error', 'Ошибка авторизации');
        }
    };

    return (
        <div className={'mainBlockLogin'}>
            <div className={'loginMainBlock'}>
                <div className={'logoLogin'}>
                    <img src={'../../oggetto-logo_tonal-hor-rus.png'} alt={'oggetto'} width={'250'} />
                </div>
                <div className={'inputLogin'}>
                    <input
                        type={'text'}
                        name={'tg_input'}
                        onChange={(e) => setTgId(e.target.value)}
                        placeholder={'Логин'}
                    />
                    <br />
                    <input
                        type={'password'}
                        name={'pass_input'}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Пароль'}
                    />
                    <br />
                    <button onClick={authFunc}>Войти</button>
                </div>
            </div>
            <img src={kevin} className={'fixedSizeImage'} />
        </div>
    );
}

export default LoginPage;