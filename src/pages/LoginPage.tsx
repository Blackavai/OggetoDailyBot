function LoginPage () {
    return(
        <>
            <h1>Авторизация</h1>
            <input type={'text'} name={'tg_input'} placeholder={'Введите тг id'}/>
            <br/>
            <input type={'text'} name={'pass_input'} placeholder={'Введите пароль'}/>
            <br />
            <button>Войти</button>
        </>
    );
}

export default LoginPage;