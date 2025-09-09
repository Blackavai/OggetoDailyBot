import '../style/login.css';
import kevin from '../assets/kevinLogin.png';
function LoginPage () {
    return(
        <div className={'mainBlockLogin'}>
            <div className={'loginMainBlock'}>
                <div className={'logoLogin'}>
                    <img src={'../../public/oggetto-logo_tonal-hor-rus.png'} alt={'oggetto'} width={'250'}/>
                </div>
                <div className={'inputLogin'}>
                    <input type={'text'} name={'tg_input'} placeholder={'Логин'}/>
                    <br/>
                    <input type={'text'} name={'pass_input'} placeholder={'Пароль'}/>
                    <br/>
                    <button>Войти</button>
                </div>
            </div>
                <img src={kevin}  className={'fixedSizeImage'}/>
        </div>
    );
}

export default LoginPage;