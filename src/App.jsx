import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header.jsx';
import User from './users.jsx';
import MainPage from './MainPage.jsx';
import NavBar from './NavBar.jsx';

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/header" element={<Header />} />
                <Route path="/users" element={<User />} />
                <Route path="*" element={<h1>Ничего не найдено</h1>} />
            </Routes>
        </>
    );
}

export default App;
