
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';  // ✅ Import Home component
import Paste from './components/Paste';  // ✅ Import Paste component
import ViewPaste from './components/ViewPaste';

const router = createBrowserRouter([
  { 
    path: "/", 
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ) 
  },
  { 
    path: "/pastes", 
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ) 
  },
  { 
    path: "/pastes/:id", 
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ) 
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
