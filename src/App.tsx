// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetupPage from '../src/pages/setupPage';
import ProfilePage from '../src/pages/profilePage';
import LandingPage from '../src/pages/landingpage.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/setup" element={<SetupPage/>}/>
                <Route path="/u/:slug" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
