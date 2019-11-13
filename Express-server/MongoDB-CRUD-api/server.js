const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Database
require('./mongodb');

//Models
require('./model/post');
const post = mongoose.model('Posts');

//Middleware
app.use(bodyParser.json());

app.get('/post', async (req, res) => {
    try {
        const posts = await post.find({})
        res.send(posts)
    } catch (error) {
        res.status(500);
        res.send(`Failed to get all records`);

    }
})

app.get('/post/:postId', async (req, res) => {
    try {
        const posts = await post.findOne({ _id: req.params.postId });
        res.send(posts);
    } catch (error) {
        res.status(500);
        console.log('Error', error)

    }
})

app.put("/post/:postId", async (req, res) => {
    try {
        const posts = await post.findByIdAndUpdate({
            _id: req.params.postId,
        },
            req.body, {
            new: true,
            runValidators: true
        })
        res.send(posts)
    } catch (error) {
        res.status(500)
        console.log("error", error)
    }
})

app.delete("/post/:postId", async (req, res) => {
    try {
        const posts = await post.findByIdAndRemove({
            _id: req.params.postId,
        })
        res.send(posts)
    } catch (error) {
        res.status(500)
        console.log("error", error)
    }
})


app.post('/post', async (req, res) => {
    try {
        const Post = new post();
        Post.title = req.body.title;
        Post.content = req.body.content;
        await Post.save();
        res.send(Post)
    } catch (error) {
        res.status(500);
        res.send(`Failed to create new record`);
        console.log(error);
    }
})





app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
})
