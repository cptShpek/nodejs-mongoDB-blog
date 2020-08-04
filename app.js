const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')

const app = express();

//connect to MongoDB

const dbURI = 'mongodb+srv://Shpek:1234@cluster0.hugrg.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        // listen for request
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err)
    })
// register view engine

app.set('view engine', 'ejs');

// middlware & static files

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/all-blog', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('5f293ef107e9ad2f7c54af52')
//         .then(result => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })      
// })

// routes

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

// blog routes

app.use('/blogs', blogRoutes);

// 404

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})