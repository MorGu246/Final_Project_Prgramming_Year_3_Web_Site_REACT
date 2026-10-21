import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// 1. ייבוא של הדפים הקיימים
import WelcomePage from './my_Pages/first_page';
import SecondPage from './my_Pages/second_page';   
import SignUpPage from './my_Pages/sign_up_page'; 
import EnterToChatting from './my_Pages/enter_to_chatting'; 
import ChatPage from './my_Pages/chat';
import ProfilePage from './my_Pages/profile';
import PokemonInfo from './my_Pages/pokemonInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* דף הבית (לובי כניסה) */}
        <Route path="/" element={<WelcomePage />} />
        {/* הדף אליו מנווטים אחרי התחברות מוצלחת */}
        <Route path="/welcome-back" element={<SecondPage />} />
        {/* הדף אליו מנווטים בלחיצה על Sign Up */}
        <Route path="/signup" element={<SignUpPage />} />
        {/* 🆕 הוספה 2: הנתיב שמחבר את הכפתור מ-SecondPage לדף החדש */}
        <Route path="/all-users" element={<EnterToChatting />} />

        <Route path="/chat" element={<ChatPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/first-page" element={<WelcomePage />}/>

        <Route path="/pokemon-info" element={<PokemonInfo />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
