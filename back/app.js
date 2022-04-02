const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
//서버 실행시 디비 시퀄라이즈 연결도 같이하는 코드
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

passportConfig();

// 브라우저에서 온 요청 모두 허락
app.use(cors({
    origin: true,
}));
//front에서 보내준 데이터를 req.body 안에 넣어주는 역할!!!
app.use(express.json());  //front에서 json형식 파일 req.body안에 넣어줌
app.use(express.urlencoded({ extended: true})); //front에서 form submit형식 파일 req.body안에 넣어줌
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));

app.get('/', (req, res) => {
    res.send('hello express')
});

app.get('/', (req, res) => {
    res.send('hello api')
});

app.get('/posts', (req, res) => {
    res.json([
        { id: 1, content: 'hello1'},
        { id: 2, content: 'hello2'},
        { id: 3, content: 'hello3'},
    ]);
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('서버 실행 중!!');
});