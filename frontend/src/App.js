import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Home from './pages/home';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
// import Message from './components/layout/Message';
import Profile from './pages/User/profile';
import { UserProvider } from './context/UserContext';
import MyPets from './pages/Pet/mypets';
import AddPet from './pages/Pet/addpet';
import EditPet from './pages/Pet/editpet';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        {/* <Message /> */}
        <Container>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/user/profile" element={ <Profile /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/pet/mypets" element={ <MyPets /> } />
            <Route path="/pet/add" element={ <AddPet /> } />
            <Route path="/pet/edit/:id" element={ <EditPet /> } />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
