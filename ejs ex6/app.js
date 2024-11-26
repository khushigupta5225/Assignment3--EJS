const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store blog posts (temporary in-memory storage)
const posts = [];

// Route to display the form and list of posts
app.get('/posts', (req, res) => {
    res.render('posts', { posts: posts });
});

// Route to handle new post form submission
app.post('/new-post', (req, res) => {
    const newPost = {
        title: req.body.title,
        body: req.body.body
    };
    posts.push(newPost);
    res.redirect('/posts');
});

// Route to display individual post details
app.get('/posts/:title', (req, res) => {
    const postTitle = req.params.title;
    const post = posts.find(p => p.title === postTitle);
    if (post) {
        res.render('post-detail', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});


app.get('/contact',(req,res)=>{
    const error=req.query.error;
   res.render('contact',{error: error || null,formData:{} });
});

app.post('/contact',(req,res)=>{
    const {name,email,message}=req.body;

if(!name||!email||!message){
    res.render('contact',{
        error:'All fields are required',
        formData:req.body
    });
}else{
    res.render('contact',{
        error:null,
        formData:{name,email,message}

        });
}
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
