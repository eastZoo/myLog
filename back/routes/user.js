const express = require('express');
const bcrypt = require('bcrypt');
const { User, Post } = require('../models');
const passport = require('passport');
const passportHttp = require('passport-http');
const logout = require('express-passport-logout');

const router = express.Router();

// Router이나 app에 붙는 애들이 보통 다 미들웨어이다
// 미들웨어 확장 passport.authenticate으로 인해 (req,res,next)쓸자리가 없어 확장 ( express 기법 중 하나 )
// start logIn course #3 -> passport/local.js
// start logIn course #5 callback  return -> passport/index.js serializerUser
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if ( info ) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {    // 우리서비스 로그인 다통과후 한번더 패스포트 로그인 부분
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            //시퀄라이즈가 다른테이블들과의 관계를 자동으로 합쳐서 보내준다 ( attributes로 원하는것만 골라올 수 도있음 )
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req,res,next);
});


// start signUp course #5
//req <- from saga/user.js signUpAPI data
router.post('/', async (req, res, next) => { //POST /user
    try{
        // 중복회원 검사
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (exUser) {
            return res.status(403).send("already use email.") // return 안쓰면 밑에코드까지 그대로 실행되고 res 응답 두번 보내져 error 발생( 응답은 무조건 1번 )
        }
        //bcrypt도 비동기라 await 붙여줌
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //보통 10~13 넣음
        await User.create({
            email : req.body.email,
            nickname:  req.body.nickname,
            password: hashedPassword,
        });
        res.status(200).send('ok');
    } catch (error) {
        console.log(error);
        next(error); //status 500
    }
});

router.post('/logout', (req, res) => {
    logout();
    req.session.destroy();
    res.send('ok')
});


module.exports = router;