import { Routes, Route, useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Letter from './pages/Letter';
import Card from './pages/Card';
import Create from './pages/Create';
import Legal from './pages/Legal';
import { useValentine } from './context/ValentineContext';
import './App.css';

// Component to handle loading dynamic ID
function ValentineLoader() {
  const { id } = useParams();
  const { loadValentine } = useValentine();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadValentine(id).then(success => {
        if (success) {
            navigate('/'); // Redirect to home with loaded data
        } else {
            alert("Valentine not found!");
            navigate('/');
        }
      });
    }
  }, [id, loadValentine, navigate]);

  return <div className="min-h-screen flex items-center justify-center text-[#ff4d6d]">Loading your Valentine...</div>;
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/v/:id" element={<ValentineLoader />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/card" element={<Card />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </div>
  );
}

export default App;
