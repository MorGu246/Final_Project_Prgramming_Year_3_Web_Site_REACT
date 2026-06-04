// import React from 'react';

// const SecondPage = () => {
//     return (
//         <div style={{ color: 'white', minHeight: '100vh', backgroundColor: 'bisque', padding: '20px' }}>
//             <h1>Welcome back</h1>
//         </div>
//     );
// };

// export default SecondPage;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ייבוא ה-Hook לניווט ב-React
import EnterToChatting from './enter_to_chatting';

const SecondPage = () => {
    const navigate = useNavigate();
    const currentUser = sessionStorage.getItem('currentUser');

    // אבטחת הדף: אם משתמש לא מחובר מנסה להיכנס ישירות לכתובת הזו, נזרוק אותו חזרה
    useEffect(() => {
        if (!currentUser) {
            alert("אינך מחובר!");
            navigate('/'); // מנווט חזרה לדף הבית/התחברות (שנה את הנתיב בהתאם לראוטר שלך)
        }
    }, [currentUser, navigate]);

    const goToMyProfile = () => {
        if (currentUser) {
            // מעבר לדף הפרופיל עם ה-Query Parameter של שם המשתמש
            navigate(`/profile?user=${currentUser}`);
        }
    };

    const goToAllUsers = () => {
        // מעבר לדף רשימת המשתמשים
        navigate('/all-users'); // שנה את הנתיב לשם הראוט שהגדרת ב-App.js לטובת הדף הזה
    };

    // אם המשתמש לא מחובר, נחזיר null כדי שלא תהיה קפיצה בעין של התפריט לפני ה-Redirect
    if (!currentUser) return null;

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: 'bisque', 
            padding: '20px',
            gap: '10px',
            color: '#333' // שיניתי לשחור/אפור כי לבן על רקע bisque קשה מאוד לקריאה
        }}>
            <h1>תפריט ראשי</h1>
            
            <button onClick={goToMyProfile} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                לפרופיל האישי שלי
            </button>
            
            <button onClick={goToAllUsers} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                רשימת משתמשים (כדי להתכתב)
            </button>
        </div>
    );
};

export default SecondPage;