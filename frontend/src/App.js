import './App.css';
import MyAppBar from './components/MyAppBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile';
import Login from './views/Login';
import Register from './views/Register';
import AddUser from './views/AddUser';
import EditUser from './views/EditUser';
import DeleteUser from './views/DeleteUser';
import ViewAllUsers from './views/ViewAllUsers';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div className="App"> 
      <Router>
        <MyAppBar/>
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
