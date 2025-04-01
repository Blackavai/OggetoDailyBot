import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/Header.jsx';
import User from './pages/users.jsx';
import NavBar from './pages/NavBar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Teams from './pages/Teams.jsx';
import TeamEdit from './pages/TeamEdit.jsx';
import TasksList from './pages/TasksList.jsx';
import NewTask from './pages/NewTask.jsx';
import ReportsList from './pages/ReportsList.jsx';

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
