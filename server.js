const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');



const app = express();
mongoose.connect('mongodb://localhost/myBlog',{
useNewUrlParser:true,
useUnifiedTopology:true},(err) =>{
    if (err) {
        console.log(err)
    }else {
        console.log('blog database connection succesful')
    }
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/',async  (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
res.render("articles/index", {articles: articles})
});
app.use('/articles', articleRouter)
app.listen(5000,()=> console.log("server loading on port 5000"))