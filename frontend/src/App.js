import './App.css';
import MyAppBar from './components/MyAppBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import AddUser from './views/AddUser';
import EditUser from './views/EditUser';
import DeleteUser from './views/DeleteUser';

function App() {
  return (
    <div className="App">
      <Router>
        <MyAppBar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/register' exact element={<Register/>}/>
          <Route path='/add' exact element={<AddUser/>}/>
          <Route path='/edit' exact element={<EditUser/>}/>
          <Route path='/delete' exact element={<DeleteUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
