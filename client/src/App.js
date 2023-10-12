import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';

function App() {

  return (
    <div className="w-full">
      <Routes>
        <Route exact path='*' element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
