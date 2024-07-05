import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/Form';
import SecondPage from './components/SecondPage';
import  ProtectedRoute  from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/second" element={<ProtectedRoute><SecondPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};



export default App;
