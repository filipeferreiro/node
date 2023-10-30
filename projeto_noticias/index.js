const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs')

const app = express();

const Posts = require('./Posts.js');
const Users = require('./Users.js');

var session = require('express-session');


mongoose.connect('mongodb+srv://root:wkAzy1Rf0O4alsLH@cluster0.da40k.mongodb.net/dankicode?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('conectado ao banco');
}).catch((err)=>{
    console.log(err.message);
});

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'f87xvbxzcuzx88asdkapokxc',
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true
}))

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
                    autor: val.autor,
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
                        autor: val.autor,
                        slug: val.slug,
                        categoria: val.categoria,
                    }
                })


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
});

app.post('/admin/login',(req,res)=>{
    Users.findOne({login: req.body.login}).then((user)=>{
        console.log(user.password)
        const valid = req.body.senha === user.password;
        if(valid){
            req.session.login = user.login;
            res.redirect('/admin/login');
        }else{
            res.redirect('/admin/login');
            console.log('invalido');
        }
    }).catch((err)=>{
        res.send('login inválido');
        console.log(err.message);
    })
});

app.post('/admin/cadastro',(req,res)=>{
    console.log(req.files)
    let formato = req.files.arquivo.name.split('.');
    var imagem = '';
    if(formato[formato.length -1] == "jpg"){
        imagem = new Date().getTime()+'.jpg';
        req.files.arquivo.mv(__dirname+'/public/images/'+imagem)
    }else{
        fs.unlinkSync(req.files.arquivo.tempFilePath);
    }

    Posts.create({
        titulo:req.body.titulo_noticia,
        imagem:'http://localhost:5000/public/images/'+imagem,
        categoria:req.body.categoria,
        conteudo:req.body.noticia,
        slug:req.body.slug,
        autor:req.body.autor,
        views:0
    })
    res.redirect('/admin/login');
});

app.get('/admin/deletar/:id',(req,res)=>{
    Posts.deleteOne({_id:req.params.id}).then(()=>{
        res.redirect('/admin/login');
    })
});

app.get('/admin/login',(req,res)=>{
    if(req.session.login != null){
        Posts.find({}).sort({'_id': -1}).then((posts)=>{
            posts = posts.map((val)=>{
                return{
                    id: val._id,
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricao: val.conteudo.substring(0,230)+'...',
                    descricaoSmall: val.conteudo.substring(0,130),
                    imagem: val.imagem,
                    autor: val.autor,
                    slug: val.slug,
                    categoria: val.categoria,
                }
            })

            res.render('admin-painel',{posts:posts})

        }).catch((err)=>{
            console.log(err.message);
        });
    }else{
        res.render('admin-login',{});
    }
})

app.listen(5000,()=>{
    console.log('rodando...');
})