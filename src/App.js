import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/homePage';
import LoginPage from './pages/LoginPage/loginPage';
import PostedJobs from './pages/PostedJobs/postedJobs';
import Applicants from './components/Applicants';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/postedjobs' element={<PostedJobs />} />
      <Route path='/applicants' element={<Applicants />} />
    </Routes>
  );
}

export default App;
