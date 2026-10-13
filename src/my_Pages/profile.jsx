import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // שליפת שם המשתמש מתוך ה-URL (למשל profile?user=test1) או מתוך ה-sessionStorage
    const currentUser = sessionStorage.getItem('currentUser');
    const profileUser = searchParams.get('user') || currentUser;

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // אבטחה: אם אין משתמש מחובר
        if (!currentUser) {
            alert("אינך מחובר!");
            navigate('/');
            return;
        }

        // טעינת פרטי המשתמש מהשרת
        const fetchUserProfile = async () => {
            try {
                // קריאת API לשרת לפי שם המשתמש
                const response = await fetch(`http://localhost:5698/auth/user/${profileUser}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    console.error("Failed to fetch user profile");
                }
            } catch (err) {
                console.error("Error loading profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [currentUser, profileUser, navigate]);

    if (!currentUser) return null;

    return (
        <div style={{
            backgroundColor: 'aliceblue',
            fontFamily: 'Arial, sans-serif',
            minHeight: '100vh',
            padding: '20px',
            direction: 'rtl',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1>פרופיל משתמש: {profileUser}</h1>

            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                width: '300px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                marginTop: '20px'
            }}>
                {loading ? (
                    <p>טוען פרטים...</p>
                ) : userInfo ? (
                    <div>
                        <p><strong>שם משתמש:</strong> {userInfo.user_name || profileUser}</p>
                        <p><strong>אימייל:</strong> {userInfo.email || 'לא עודכן'}</p>
                        {/* תוכל להוסיף כאן שדות נוספים מה-DB שלכם */}
                    </div>
                ) : (
                    <div>
                        <p><strong>שם משתמש:</strong> {profileUser}</p>
                        <p style={{ color: 'gray' }}>מחובר כעת במערכת</p>
                    </div>
                )}
            </div>

            <button
                onClick={() => navigate('/welcome-back')}
                style={{
                    marginTop: '20px',
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}
            >
                חזרה לתפריט הראשי
            </button>
        </div>
    );
};

export default ProfilePage;