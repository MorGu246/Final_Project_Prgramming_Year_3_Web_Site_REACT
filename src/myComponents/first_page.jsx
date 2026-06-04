import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. ייבוא ה-Hook לניווט

const WelcomePage = () => {
    // הגדרת State - המקום שבו React שומרת את מה שהמשתמש מקליד
    const [loginUser, setLoginUser] = useState('');
    const [loginPass, setLoginPass] = useState('');
    
    const navigate = useNavigate(); // 2. אתחול פונקציית הניווט

    // פונקציית ההתחברות (המרה של מה שהיה ב-index_login.js)
    const handleLogin = async () => {
        if (!loginUser || !loginPass) {
            alert("נא למלא את כל השדות");
            return;
        }
        try {
            const response = await fetch('http://localhost:5698/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_name: loginUser,
                    password: loginPass
                })
            });
            const data = await response.json();
            if (response.ok) {
                // שומרים ב-sessionStorage בדיוק כמו קודם
                sessionStorage.setItem('currentUser', loginUser);
                
                // 3. שינוי: מעבר דף חלק ל-SecondPage (הנתיב שהגדרנו ב-App.jsx)
                navigate('/welcome-back'); 
            } else {
                alert(data.message || "שגיאה בהתחברות");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("קרתה שגיאה בחיבור לשרת");
        }
    };

    return (
        <div style={{ 
            backgroundColor: 'bisque', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1>WELCOME!</h1>
            <div id="loginForm" style={{ textAlign: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', background: '#fff' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="login_user">user name: </label>
                    <input 
                        type="text" 
                        id="login_user" 
                        value={loginUser}
                        onChange={(e) => setLoginUser(e.target.value)} // עדכון ה-State
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="login_pass">password: </label>
                    <input 
                        type="password" 
                        id="login_pass" 
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)} // עדכון ה-State
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button onClick={handleLogin}>sign in</button>
                    
                    {/* שינוי: ניווט דף ההרשמה באמצעות navigate */}
                    <button onClick={() => navigate('/signup')}>
                        sign up
                    </button>
                </div>
            </div>
            <br />
            {/* שינוי: החלפת ה-a tag לניווט של React כדי למנוע רענון מלא של הדפדפן */}
            <span 
                onClick={() => navigate('/info')} 
                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            >
                to info (testing only)
            </span>
        </div>
    );
};

export default WelcomePage;