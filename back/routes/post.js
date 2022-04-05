const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, Image, Comment, User } = require('../models');

const router = express.Router();
// start Post course #4 -> sagas/post.js addPost
router.post('/', isLoggedIn, async (req, res, next) => { //POST /post
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,    // 로그인한 상황 deserializUser덕분에 id로 정보가져올 수 있음
        });
        const fullPost = await Post.findOne({
            where: { id : post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
            }, {
                model: User,
            }]
        })
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 달기
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { //POST /post/1/comment
    try {
        //댓글달기전에 게시글 있는지 한번더 확인해주는 로직
        const post = await Post.findOne({
            where: {id: req.params.postId},
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        })
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.delete('/', (req, res) => { //DELETE /post
    res.json({ id: 1 });
});

module.exports = router;