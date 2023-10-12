import About from './Components/About';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="w-full">
      <Routes>
        <Route exact path='*' element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
