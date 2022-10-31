import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ShoeEditForm from './components/Forms/ShoeEditForm';
import Details from './components/pages/Details';
import Home from './components/pages/Home';
import Inquiries from './components/pages/Inquiries';
import TestPage from './components/pages/TestPage';
import Navbar from './components/partials/navbar';
import Shoes from './components/partials/Shoes';
import ShoeDetails from './components/partials/ShoeDetails';

function App() {
  return (
    <Router>
      <header className='text-center'>
        <Navbar />
      </header>
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

    </Routes>
      </div>
    </Router>
   
  );
}

export default App;
