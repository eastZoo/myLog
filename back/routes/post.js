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
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
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
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch('/:postId/like', async (req, res, next) => { // PATCH /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:postId/like', async (req, res, next) => { // DELETE /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 제거
router.delete('/:postId', async (req, res, next) => { //DELETE /post
    try {
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        // 처음에 params로 문자열로 아이디를 보내줘서 에러! int로 변환후 보내자
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;