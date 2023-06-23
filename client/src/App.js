import HomePage from './Components/HomePage';
import { Routes, Route } from 'react-router-dom';

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
