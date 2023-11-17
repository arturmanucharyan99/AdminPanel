import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import AddUser from './pages/AddUser/AddUser';
import Error from './pages/Error/Error';
import Footer from './components/Footer/Footer';

// element={<Navbar/>}
function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Home/>}/>
          <Route path='/add-user' element={<AddUser/>}/>
          <Route path='/details/:id' element={<AddUser/>}/>
          <Route path='*' element={<Error/>}/>
        </Route>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
