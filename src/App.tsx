import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/Header.tsx';
import User from './pages/users.tsx';
import NavBar from './pages/NavBar.tsx';
import LoginPage from './pages/LoginPage.tsx';
import Teams from './pages/Teams.tsx';
import TeamEdit from './pages/TeamEdit.tsx';
import TasksList from './pages/TasksList.tsx';
import NewTask from './pages/NewTask.tsx';
import ReportsList from './pages/ReportsList.tsx';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<NavBar />} />
                <Route path="/users" element={<User />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/team_edit" element={<TeamEdit />} />
                <Route path="/tasks_list" element={<TasksList />} />
                <Route path="/new_task" element={<NewTask />} />
                <Route path="/reports_list" element={<ReportsList />} />
                <Route path="*" element={<h1>Такой страницы не существует</h1>} />
            </Routes>
        </>
    );
}

export default App;
