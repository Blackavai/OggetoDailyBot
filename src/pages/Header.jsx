import '../style/header.css';

import { NavLink } from 'react-router-dom';

function Header(){
    return(
        <div className={'mainBlock mainBlockGrid'}>
            <div className={'border_block'}>

            </div>
            <div className={'border_block item_logo'}>
                <img src={'../../public/oggetto_logo.png'} alt={'oggetto'}/>
            </div>
            <div className={'border_block'}></div>
            <NavLink to="/">Главная страница</NavLink>
        </div>
    );
}

export default Header;