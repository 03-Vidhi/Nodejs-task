const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
  try {
    const { title, body, active, location } = req.body;
    const { latitude, longitude } = location;
    
    
    const post = new Post({
      title,
      body,
      active,
      location: {
        latitude,
        longitude
      }
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, body, active } = req.body;
    const post = await Post.findOneAndUpdate({ _id: req.params.postId, createdBy: req.user._id }, { title, body, active }, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you are not authorized to update it' });
    }
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.postId, createdBy: req.user._id });
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you are not authorized to delete it' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
