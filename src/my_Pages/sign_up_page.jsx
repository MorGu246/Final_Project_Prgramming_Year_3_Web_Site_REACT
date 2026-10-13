import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ייבוא ה-Hook לניווט

const SignUpPage = () => {
    // הגדרת State לשמירת השדות בזמן אמת
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate(); // אתחול פונקציית הניווט

    const handleSignUp = async (e) => {
        // מניעת רענון ברירת המחדל של הטופס (במקום event.preventDefault() בתוך ה-HTML)
        e.preventDefault(); 

        if (!userName || !password) {
            return alert("Please fill all fields");
        }

        try {
            // פנייה לכתובת המלאה של השרת (Backend) שלך
            const response = await fetch('http://localhost:5698/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    user_name: userName, 
                    password: password 
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("User created successfully!");
                navigate('/'); // חזרה לדף הלובי/הכניסה הראשי שהגדרת ב-App.jsx
            } else {
                alert(result.message || "Error creating user");
            }
        } catch (error) {
            console.error("Sign-up error:", error);
            alert("Connection error to the server");
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>sign up</h1>
            <div style={{ backgroundColor: 'blanchedalmond', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
                
                {/* הצמדת פונקציית הטיפול לאירוע ה-onSubmit של הטופס */}
                <form onSubmit={handleSignUp}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="user_name">choose user name: </label>
                        <input 
                            type="text" 
                            id="user_name" 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} // עדכון המשתנה בכל הקלדה
                            required 
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="user_password">choose password: </label>
                        <input 
                            type="password" 
                            id="user_password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // עדכון המשתנה בכל הקלדה
                            required 
                        />
                    </div>
                    
                    <button type="submit">Create User</button>
                </form>
                
                <br />
                {/* מעבר דף חלק לדף הבית ללא רענון */}
                <button onClick={() => navigate('/')}>
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default SignUpPage;