// const express = require('express');
// const path = require('path');
// const cors = require('cors'); // 1. ייבוא חבילת ה-cors שהתקנת
// const params = require('./params');
// const users_R = require('./Routers/users_R');
// const chat_R = require('./Routers/chat_R');

const express = require('express');
console.log("➡️ 1. Express נטען בהצלחה");

const path = require('path');
const cors = require('cors');

console.log("➡️ 2. מנסה לטעון את params...");
const params = require('./params');
console.log("➡️ 3. params נטען בהצלחה");

console.log("➡️ 4. מנסה לטעון את הראוטר של המשתמשים...");
const users_R = require('./Routers/users_R');
console.log("➡️ 5. ראוטר משתמשים נטען בהצלחה");

console.log("➡️ 6. מנסה לטעון את הראוטר של הצ'אט...");
const chat_R = require('./Routers/chat_R');
console.log("➡️ 7. ראוטר צ'אט נטען בהצלחה");

const app = express();
const PORT = params.PORT || 5698;

// 2. הגדרת CORS - חובה כדי ששרת ה-React יוכל לדבר עם השרת הזה
app.use(cors({
    origin: '*', // מאפשר לכל פורט (כולל ה-React שלך) לפנות לשרת
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 3. מחיקה/שינוי: אין יותר צורך ב-app.use(express.static) או ב-app.get('/') שמגיש HTML,
// מכיוון ששרת ה-React הוא זה שמציג ומנהל את הדפים עכשיו.

app.use('/auth', users_R);
app.use('/chat', chat_R);

// 1. נשנה את ה-app.listen כדי שיבדוק כמה חיבורים פתוחים יש לו ברקע
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    // בדיקה פנימית של Node.js - האם יש שרת פעיל ברקע?
    const activeHandles = process._getActiveHandles().length;
    console.log(`➡️ מספר חיבורים פעילים ב-Event Loop: ${activeHandles}`);
});

// 2. נתפוס את אירוע היציאה הרשמי של התוכנית ונראה מה קוד היציאה
process.on('exit', (code) => {
    console.log(`💥 השרת קיבל פקודת יציאה רשמית ונסגר עם קוד: ${code}`);
});

// השורות הקודמות ששמנו (משאירים אותן)
process.on('uncaughtException', (err) => {
    console.error('💥 הקריסה נתפסה! שגיאה חמורה בשרת:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 הבטחה (Promise) נדחתה ולא טופלה:', reason);
});

//node index_login.js בטרמינל
// const port = 5698;

// const express = require('express');
// const app = express();
// app.use(express.json());

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));

// const path=require('path');
// //app.use(express.static(path.join(__dirname,"")));//-----

// let db_M = require('./database');
// global.db_pool=db_M.pool;

// //app.set("view engine", "ejs");
// //app.set('views', path.join(__dirname, "/views"));

// var cookieParser = require('cookie-parser');
// app.use(cookieParser());

// var htmlspecialchars = require('htmlspecialchars');

// var jwt = require('jsonwebtoken');//21/1/2025

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //let curr_id2=1;
// //let users=[];

// let salt='Q'

// var md5 = require('md5'); //להצפין סיסמה
// const{addSlashes,scriptSlashes}=require('slashes');//למנוע SQL injection

// app.post('/register',async(req,res) => {//function (res,req) {}
// let user_name=addSlashes(req.body.user_name);//למנוע SQL injection
// let password=md5(salt+req.body.password); //md5 עוזר להצפין סיסמה + salt
// let Query="INSERT INTO `users_db`";
// Query+="(`user_name`, `password`)";
// Query+="VALUES";
// Query+=`('${user_name}','${password}')`;
// const promisePool = db_pool.promise();
//     let rows=[];
//     try {
//         [rows] = await promisePool.query(Query);
//         res.status(200).json({msg:"ok",insertId:rows.insertId});       
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({msg: err});
//     }
// });

// app.post('/login',async(req,res) => {//לבדוק אם שם משתמש וסיסמה קיימים בדטה בייס
//     let user_name=addSlashes(req.body.user_name);//למנוע SQL injection
//     let password=md5('Q'+req.body.password);//md5 עוזר להצפין סיסמה + salt
//     let h='a\'fbg';
//     let j = 'ג\'ינג\'י';// להוסיף בקסלאש דואג שגרש לא יסגור את התוכן
//     let Query=" SELECT * FROM users_db ";
//     Query += " WHERE ";
//     Query +=` user_name='${user_name}' `;
//     Query +=" AND ";
//     Query +=` password='${password}' `;
//     console.log(Query);

//     const promisePool = db_pool.promise();
//     let rows=[];
//     try {
//         [rows] = await promisePool.query(Query);
//         if(rows.length===0){
//             res.status(200).json({msg:"NO"});
//         } else {
//             // console.log("id=",rows[0].id);
//             let val = `${rows[0].id},${rows[0].name}`;
//             //res.cookie("ImLogged", val, {                //<==|
//                 var token = jwt.sign(                      //   | 
//                     {data: val},                           //   |
//                     'myPrivateKey',                        //   |
//                     { expiresIn: 31*24*60*60 // in sec     //   |
//                     });                                    //   |
//                 res.cookie("ImLogged", token, {            //   |  
//                 maxAge: 31*24*60*60*1000, // 3hrs in ms    //==>|
//             });
//             //HadLogin=true;
//             res.status(200).json({msg:"ok"});
//         }      
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({msg: err});
//     }
// });

// //7/1/2025
// app.get('/userslist',async(req,res) => {//להציג רשימת יוזרים
//     //let name=addSlashes(req.body.name);
//     //let username=addSlashes(req.body.username);
//     let Query=" SELECT user_name FROM users_db ";
//     /*Query += " WHERE ";
//     Query +=` username='${username}' `;
//     Query +=" AND ";
//     Query +=` password='${password}' `;*/
//     console.log(Query);
//     const promisePool = db_pool.promise();
//     let rows=[];
//     try {
//         [rows] = await promisePool.query(Query);
//         for(let k in rows){
//             rows[k].user_name=/*stripSlashes(*/rows[k].user_name;//);
//         }
//         res.status(200).json(rows);
//     } catch (err) {
//         console.log(err);
//         /*return*/ res.status(500).json({msg: err});
//     }
// });

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.get('/admin',(req,res) => {//function (res,req) {}
// res.status(200).sendFile(path.join(__dirname,"/first_page.html"));
// });

// app.get('/adminPassword',(req,res) => {//function (res,req) {}
// res.status(200).sendFile(path.join(__dirname,"/sign_up_page.html"));
// });

// app.get('/Lpage',(req,res) => {//function (res,req) {}
//     //אם עשיתי בעבר לוגין אני רוצה לעבור לעמוד פנימי -------------------------------------
//     const jwtToken = req.cookies.ImLogged; //28/1/2025 -------------------------------------
//     let user_id=-1;
//     if (jwtToken !== "") {
//         jwt.verify(jwtToken, 'myPrivateKey', async (err, decodedToken) => {
//                 console.log("decodedToken=",decodedToken);
//             if (err) {
//                 console.log("err=",err);
//             } else {
//                 // let val = `${rows[0].id},${rows[0].name}`;
//                 let data = decodedToken.data;
//                 console.log("data=",data);
//             }
//         })
//     } //28/1/2025 ---------------------------------------------------------------------
// res.status(200).sendFile(path.join(__dirname,"/first_page.html"));
// });

// app.get('/afterLpage',(req,res) => {//function (res,req) {}
//     if(req.cookies.ImLogged === undefined)/*(!HadLogin)*/{
//         res.redirect("/Lpage");
//     } else
// res.status(200).sendFile(path.join(__dirname,"/second_page.html"));
// });

// app.get('/',(req,res) => {//function (res,req) {}
// res.status(200).sendFile(path.join(__dirname,"/first_page.html"));
// });

// app.get("/ssr", (req,res)=>{ // כדי לראות SSR
//     res.render("review_ssr",
//         {AllReviews:reviews}
//     );
// });

// app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
//     console.log(`Now listening on port http://localhost:${port}`);
// });


// //<script>alert("Hello, this is an alert!")</script>
// //<img src='x' onerror=\"alert(1)\"> באקסלש אומר שהתו אחריו הוא רק ציור
// //<img src='x' onerror='alert(1)'> לרשום להגנה מזה -- זאת התקפת XSS

// /*function htmlspecialchars(item) {
//     return item.replace(/&/g, '&amp;')
//                .replace(/</g, '&lt;')
//                .replace(/>/g, '&gt;')
//                .replace(/"/g, '&quot;')
//                .replace(/'/g, '&#039;');
// }*/

// //הרעלת עוגייה - סוג של התקפה
// //כששומרים מידע בתוך העוגייה והעוגייה נמצאת בתוך המחשב של הגולש, הגולש יכול לשנות את המידע הזה
// //דרך להצפין עוגייה - JWT - JSON Web Token

// //21/1/25 brute force
// //capcha
// //2FA - לשלוח אס אם אס אחרי שרושמים סיסמה כדי לראות שהמשתמש הנכון נכנס - בעיה של עלות אסאםאסים
// // אפשר גם לשלוח למייל אבל אז זה איטי