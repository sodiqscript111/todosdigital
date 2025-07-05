// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetupPage from '../src/pages/setupPage';
import ProfilePage from '../src/pages/profilePage';
// @ts-ignore
import LandingPage from '../src/pages/landingPage';

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
