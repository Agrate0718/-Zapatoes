import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Details from './components/pages/Details';
import Home from './components/pages/Home';
import Inquiries from './components/pages/Inquiries';
import View from './components/pages/View';
// import './App.css';
import Navbar from './components/partials/navbar';

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
            path="/Details"
            element={<Details />}
          />

    <Route // Landing
            path="/Inquiries"
            element={<Inquiries />}
          />

      <Route // Landing
            path="/View"
            element={<View />}
          />

    </Routes>
      </div>
    </Router>
   
  );
}

export default App;
