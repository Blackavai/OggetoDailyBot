import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/Header.tsx';
import User from './pages/users.tsx';
import NavBar from './pages/NavBar.tsx';
import LoginPage from './pages/LoginPage.tsx';
import Teams from './pages/Teams.tsx';
import TasksList from './pages/TasksList.tsx';
import ReportsList from './pages/ReportsList.tsx';
import VacationList from './pages/VacationList.tsx';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<NavBar />} />
                <Route path="/users" element={<User />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/tasks_list" element={<TasksList />} />
                <Route path="/reports_list" element={<ReportsList />} />
                <Route path="/vacation_list" element={<VacationList />} />
                <Route path="*" element={<h1>Такой страницы не существует</h1>} />
            </Routes>
        </>
    );
}

export default App;
