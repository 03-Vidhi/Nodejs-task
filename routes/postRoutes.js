const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { validatePost } = require('../validators/postValidators');
const passport = require('passport');

router.post('/posts', passport.authenticate('jwt', { session: false }), validatePost, postController.createPost);
router.get('/posts', passport.authenticate('jwt', { session: false }), postController.getPosts);
router.put('/posts/:postId', passport.authenticate('jwt', { session: false }), validatePost, postController.updatePost);
router.delete('/posts/:postId', passport.authenticate('jwt', { session: false }), postController.deletePost);

module.exports = router;
