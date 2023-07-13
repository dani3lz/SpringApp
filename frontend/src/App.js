import './App.css';
import MyAppBar from './components/MyAppBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <MyAppBar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/register' exact element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
