import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// 1. ייבוא של כל שלושת הדפים שלך ב-React
// שינוי ה-import בתוך src/index.js בהתאם לשמות הקבצים האמיתיים שלך:
import WelcomePage from './myComponents/first_page';
import SecondPage from './myComponents/second_page';   // אם הקובץ נקרא second_page.jsx
import SignUpPage from './myComponents/sign_up_page'; // אם הקובץ נקרא sign_up_page.jsx

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
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
