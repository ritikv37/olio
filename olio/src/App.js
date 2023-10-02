import './App.css';
import Registration from './pages/Registration';
import Appbar from './components/Appbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import List from './pages/List';

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar />
        <Routes>
          <Route path='/add' element={<Registration />} />
          <Route path='/' element={<List />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
