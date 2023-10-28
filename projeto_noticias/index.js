const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const Posts = require('./Posts.js');

mongoose.connect('mongodb+srv://root:wkAzy1Rf0O4alsLH@cluster0.da40k.mongodb.net/dankicode?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('conectado ao banco');
}).catch((err)=>{
    console.log(err.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use('/public', express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'/pages'));

app.get('/',(req,res)=>{

    if(req.query.busca == null){
        Posts.find({}).sort({'_id': -1}).then((posts)=>{
            posts = posts.map((val)=>{
                return{
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricao: val.conteudo.substring(0,230)+'...',
                    descricaoSmall: val.conteudo.substring(0,130),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,
                }
            })

            Posts.find({}).sort({'views': -1}).then((postsViews)=>{
                postsViews = postsViews.map((val)=>{
                    return{
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricao: val.conteudo.substring(0,230)+'...',
                        descricaoSmall: val.conteudo.substring(0,130),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria,
                    }
                })

                console.log(posts[0]);
                res.render('home',{posts:posts,postsViews:postsViews})

            }).catch((err)=>{
                console.log(err.message);
            });
 
        }).catch((err)=>{
            console.log(err.message);
        });
        
    }else{
        
        Posts.find({titulo: {$regex: req.query.busca, $options:"i"}}).then((posts)=>{
            posts = posts.map((val)=>{
                return{
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricao: val.conteudo.substring(0,230)+'...',
                    descricaoSmall: val.conteudo.substring(0,130),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,
                }
            })
            console.log(posts);
            res.render('busca',{posts:posts,contagem:posts.length})
        }).catch((err)=>{
            console.log(err.message);
        })
        
    }

})

app.get('/:slug',(req,res)=>{
    Posts.findOneAndUpdate({slug: req.params.slug},{$inc : {views: 1}}, {new: true}).then((noticia)=>{
        
        if(noticia != null){
            Posts.find({}).sort({'views': -1}).then((postsViews)=>{
                postsViews = postsViews.map((val)=>{
                    return{
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricao: val.conteudo.substring(0,230)+'...',
                        descricaoSmall: val.conteudo.substring(0,130),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria,
                    }
                })
    
                console.log(noticia);
                res.render('noticia-single',{noticia:noticia,postsViews:postsViews})
    
            }).catch((err)=>{
                console.log(err.message);
            });
        }else{
            res.redirect('/')
        }
        
    }).catch((err)=>{
        console.log(err.message);
    })
})

app.listen(5000,()=>{
    console.log('rodando...');
})