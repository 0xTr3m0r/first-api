const express = require('express');
const router = express.Router();
const { Post } = require('../models'); 

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;

    try {
        const newPost = await Post.create({ title, content, userId });
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.title = title;
        post.content = content;
        await post.save();

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

