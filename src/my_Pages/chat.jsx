import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ChatPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // שליפת המשתמשים
    const currentUser = sessionStorage.getItem('currentUser'); // המשתמש המחובר (test1)
    const otherUser = searchParams.get('with'); // המשתמש שאיתו מתכתבים (test2)

    // ניהול הסטייט ב-React
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    // רפרנס לתיבת הצ'אט לצורך גלילה אוטומטית
    const chatBoxRef = useRef(null);

    // פונקציה למשיכת הודעות מהשרת
    const loadMessages = async () => {
        if (!currentUser || !otherUser) return;
        try {
            const response = await fetch(`http://localhost:5698/chat/history/${currentUser}/${otherUser}`);
            const data = await response.json();
            setMessages(data);
        } catch (e) {
            console.error("Failed to load messages", e);
        }
    };

    // אבטחת הדף והפעלת רענון ההודעות (כל 2 שניות)
    useEffect(() => {
        if (!currentUser) {
            alert("אינך מחובר!");
            navigate('/');
            return;
        }
        if (!otherUser) {
            alert("לא נבחר משתמש לשיחה!");
            navigate('/all-users');
            return;
        }

        // טעינה ראשונית
        loadMessages();

        // הפעלת טיימר לרענון ההודעות כל 2 שניות
        const intervalId = setInterval(loadMessages, 2000);

        // ניקוי הטיימר כשהמשתמש יוצא מהצ'אט
        return () => clearInterval(intervalId);
    }, [currentUser, otherUser, navigate]);

    // גלילה אוטומטית למטה בכל פעם שרשימת ההודעות מתעדכנת
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    // שליחת הודעה חדשה
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch('http://localhost:5698/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sender: currentUser,
                    receiver: otherUser,
                    content: newMessage.trim()
                })
            });

            if (response.ok) {
                setNewMessage(''); // ניקוי תיבת ההקלדה
                loadMessages(); // טעינה מיידית של ההודעות
            }
        } catch (e) {
            console.error("Failed to send message", e);
        }
    };

    // פונקציית בונוס: מאפשרת ללחוץ Enter כדי לשלוח הודעה במקום רק ללחוץ על הכפתור
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    if (!currentUser || !otherUser) return null;

    return (
        <div style={{ 
            backgroundColor: 'aliceblue', 
            fontFamily: 'Arial, sans-serif', 
            minHeight: '100vh', 
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h2>Chatting with {otherUser}</h2>
            
            {/* תיבת ההודעות */}
            <div 
                ref={chatBoxRef} // החיבור לרפרנס הגלילה
                style={{ 
                    width: '350px', 
                    height: '400px', 
                    border: '1px solid #ccc', 
                    overflowY: 'auto', 
                    padding: '10px', 
                    background: 'white',
                    borderRadius: '8px',
                    marginBottom: '10px'
                }}
            >
                {messages.map((msg, index) => {
                    const isMe = msg.sender_name === currentUser;
                    return (
                        <div key={index} style={{ textAlign: isMe ? 'right' : 'left', margin: '10px 0' }}>
                            <div style={{ 
                                display: 'inline-block', 
                                padding: '8px 12px', 
                                borderRadius: '15px', 
                                backgroundColor: isMe ? '#dcf8c6' : '#f0f0f0', 
                                border: '1px solid #ddd',
                                maxWidth: '75%',
                                wordBreak: 'break-word',
                                textAlign: 'left' // טקסט ההודעה עצמו ישאר מיושר רגיל
                            }}>
                                <strong>{msg.sender_name}:</strong> {msg.message_content}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* אזור ההקלדה והשליחה */}
            <div style={{ display: 'flex', width: '350px', gap: '5px' }}>
                <input 
                    type="text" 
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button 
                    onClick={sendMessage}
                    style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
                >
                    Send
                </button>
            </div>
            
            <button 
                onClick={() => navigate('/all-users')} 
                style={{ marginTop: '20px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
            >
                חזרה לרשימת השיחות
            </button>
        </div>
    );
};

export default ChatPage;