import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.page';
import NotFound from './pages/NotFound.page';
import MainLayout from './components/Layout/MainLayout';
import './style/index.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
