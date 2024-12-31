import './App.css'
import { ReadappRoutes } from './routes.tsx'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter> 
      <ReadappRoutes />
    </BrowserRouter>
  );
}

export default App





