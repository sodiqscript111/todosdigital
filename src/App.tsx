// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetupPage from '../src/pages/setupPage';
import ProfilePage from '../src/pages/profilePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SetupPage />} />
                <Route path="/u/:slug" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
