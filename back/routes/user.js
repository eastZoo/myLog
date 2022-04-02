const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

router.post('/login', (req, res, next) => { // POST /user/login

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

module.exports = router;