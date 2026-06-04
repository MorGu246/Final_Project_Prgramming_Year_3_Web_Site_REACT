import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllUsersPage = () => {
    const navigate = useNavigate();
    const currentUser = sessionStorage.getItem('currentUser');

    // הגדרת State (מצבים) ב-React במקום גישה ישירה ל-DOM
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(true);

    // אבטחת הדף וטעינת השיחות האחרונות (כולל הטיימר)
    useEffect(() => {
        if (!currentUser) {
            alert("אינך מחובר!");
            navigate('/');
            return;
        }

        // פונקציה פנימית למשיכת אנשי הקשר מהשרת
        const loadContacts = async () => {
            try {
                const response = await fetch(`http://localhost:5698/auth/contacts/${currentUser}`);
                const data = await response.json();
                setContacts(data);
                setLoadingContacts(false);
            } catch (err) {
                console.error("Error loading contacts:", err);
            }
        };

        // הפעלה ראשונית מיד כשהדף עולה
        loadContacts();

        // הגדרת הטיימר שירוץ כל 3 שניות (בדיוק כמו ה-setInterval הישן)
        const intervalId = setInterval(loadContacts, 3000);

        // חובה ב-React: ניקוי הטיימר כשהמשתמש עוזב את הדף כדי למנוע קריסות זיכרון
        return () => clearInterval(intervalId);
    }, [currentUser, navigate]);

    // פונקציית חיפוש משתמשים
    const searchUsers = async () => {
        if (!searchInput) return;

        try {
            const response = await fetch(`http://localhost:5698/auth/search/${searchInput}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (err) {
            console.error("Error searching users:", err);
        }
    };

    // אם המשתמש לא מחובר, לא נציג כלום עד ה-Redirect
    if (!currentUser) return null;

    return (
        <div style={{ 
            backgroundColor: 'aliceblue', 
            fontFamily: 'Arial, sans-serif', 
            minHeight: '100vh', 
            padding: '20px',
            direction: 'rtl' // שומר על כיוון כתיבה מימין לשמאל
        }}>
            <h1>הודעות ושיחות</h1>

            {/* אזור חיפוש משתמש חדש */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>חיפוש משתמש חדש:</h3>
                <input 
                    type="text" 
                    placeholder="הקלד שם משתמש..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ padding: '5px', marginLeft: '10px' }}
                />
                <button onClick={searchUsers} style={{ padding: '5px 15px', cursor: 'pointer' }}>חפש</button>
                
                <div style={{ marginTop: '15px' }}>
                    {searchResults
                        .filter(user => user.user_name !== currentUser) // סינון המשתמש הנוכחי
                        .map((user, index) => (
                            <p key={index} style={{ margin: '5px 0' }}>
                                {user.user_name} {' '}
                                <button 
                                    onClick={() => navigate(`/chat?with=${user.user_name}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    שלח הודעה
                                </button>
                            </p>
                        ))
                    }
                </div>
            </div>

            <hr />

            {/* אזור שיחות אחרונות */}
            <h3>שיחות אחרונות:</h3>
            <div>
                {loadingContacts ? (
                    <p>טוען שיחות...</p>
                ) : contacts.length === 0 ? (
                    <p>עדיין אין שיחות. חפש משתמש כדי להתחיל להתכתב!</p>
                ) : (
                    contacts.map((c, index) => (
                        <div key={index} style={{
                            border: "1px solid #ccc",
                            margin: "10px 0",
                            padding: "10px",
                            backgroundColor: "white",
                            borderRadius: "5px"
                        }}>
                            <strong>{c.contact_name}</strong>
                            <p style={{ color: 'gray', margin: '5px 0' }}>{c.last_message || 'אין הודעות'}</p>
                            <button 
                                onClick={() => navigate(`/chat?with=${c.contact_name}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                פתח צ'אט
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllUsersPage;