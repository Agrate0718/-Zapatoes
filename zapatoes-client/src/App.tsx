import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ShoeEditForm from './components/Forms/ShoeEditForm';
import Details from './components/pages/Details';
import Home from './components/pages/Home';
import Inquiries from './components/pages/Inquiries';
import TestPage from './components/pages/TestPage';
import Navbar from './components/partials/navbar';
import Shoes from './components/partials/Shoes';
import ShoeDetails from './components/partials/ShoeDetails';
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react';
import Login from './components/Forms/Login';
import axios from 'axios';
import ShoeForm from './components/Forms/ShoeForm';


function App() {
  // State
  const [currentUser, setCurrentUser] = useState(null)

 // Hooks
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

 

  return (
    <Router>
         <div>
    <Routes>
    <Route // Landing
            path="/"
            element={<Home />}
          />
        
        <Route // Landing
            path="/test"
            element={<TestPage />}
          />

        <Route // Edit shoe
            path="/shoes/:shoeId/edit" 
            element={<ShoeEditForm  />}
          />

    <Route // Landing
            path="/Details"
            element={<Details />}
          />

    <Route // Landing
            path="/Inquiries"
            element={<Inquiries />}
          />

      <Route // Landing
            path="/View"
            element={<Shoes />}
          />

        <Route
          path='/shoes/get/:shoeId'
          element={<ShoeDetails />}
          />

        <Route
          path='/owner'
          element={<Login />}
        />

        <Route
          path='/Create'
          element={<ShoeForm />}
        />

    </Routes>
      </div>
    </Router>
   
  );
}

export default App;
