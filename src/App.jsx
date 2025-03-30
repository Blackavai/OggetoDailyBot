import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header.jsx';
import User from './users.jsx';
import MainPage from './MainPage.jsx';
import NavBar from './NavBar.jsx';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<NavBar />} />
                <Route path="/main page" element={<MainPage />} />
                <Route path="/users" element={<User />} />
                <Route path="*" element={<h1>Ничего не найдено</h1>} />
            </Routes>
        </>
    );
}

export default App;
