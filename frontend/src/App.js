import './App.css';
import MenuBar from './components/MenuBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/HomeView';
import Profile from './views/ProfileView';
import Login from './views/LoginView';
import Register from './views/RegisterView';
import AddUser from './views/AddUserView';
import EditUser from './views/EditUserView';
import DeleteUser from './views/DeleteUserView';
import ViewAllUsers from './views/ViewAllUsersView';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';

function App() {
  return (
    <div className="App"> 
      <Router>
        <MenuBar/>
        <Routes>

          <Route path='/' exact element={<Home/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/register' exact element={<Register/>}/>

          <Route path='/profile' element={<PrivateRoute/>}>
            <Route exact path='/profile' element={<Profile/>}/>
          </Route>

          <Route path='/add' element={<AdminRoute/>}>
            <Route exact path='/add' element={<AddUser/>}/>
          </Route>

          <Route path='/edit' element={<AdminRoute/>}>
            <Route exact path='/edit' element={<EditUser/>}/>
          </Route>

          <Route path='/delete' element={<AdminRoute/>}>
            <Route exact path='/delete' element={<DeleteUser/>}/>
          </Route>

          <Route path='/admin' element={<AdminRoute/>}>
            <Route exact path='/admin' element={<ViewAllUsers/>}/>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
