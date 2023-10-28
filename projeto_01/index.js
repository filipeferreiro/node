const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use('/public', express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'/views'));

var tarefas = ['Arrumar o quarto','Comprar paçoca na vendinha','Cillum laboris consequat ipsum tempor ex. Labore eiusmod eu incididunt consequat officia cillum officia quis pariatur proident et culpa. Fugiat ullamco incididunt duis excepteur occaecat reprehenderit nostrud do consequat et dolore labore aliqua. Minim ex non in dolore ullamco Lorem commodo ea. Consequat eiusmod culpa adipisicing voluptate labore.','Eu fugiat sit est aliquip. Dolor quis laboris nostrud non incididunt et. Dolore occaecat reprehenderit magna aute ut veniam deserunt commodo commodo qui. Voluptate velit voluptate eu ullamco. Exercitation excepteur consequat sunt ex. Eiusmod commodo ullamco aliquip labore minim Lorem sint duis ullamco. Nostrud ex deserunt elit ut laborum duis et pariatur.Ipsum nulla ex id excepteur enim voluptate aute sit exercitation do culpa ad. Pariatur sunt adipisicing aliquip elit magna occaecat. Culpa ullamco aute incididunt quis anim dolor aliquip commodo dolore. Elit nisi occaecat velit quis non cillum qui et velit in ad commodo velit. Ullamco occaecat aliqua consequat duis consequat consectetur labore laborum aliquip Lorem sint magna. Proident ipsum velit consequat dolore ullamco.','Incididunt velit anim qui excepteur ex deserunt. Proident commodo non duis Lorem velit. Enim eiusmod consequat labore magna deserunt veniam eiusmod dolor dolor cupidatat ex consequat esse.','Anim elit esse dolor consectetur eu anim voluptate nostrud irure ex minim duis aliquip velit. Adipisicing ea non id Lorem est quis enim aute anim laborum ea culpa Lorem. Proident veniam reprehenderit cupidatat aute elit esse ut quis. Ea incididunt cillum et esse est eiusmod tempor.']

app.post('/',(req,res)=>{
    tarefas.push(req.body.tarefa)
    res.render('index',{tarefasList:tarefas})
})

app.post('/deletar/:id',(req,res)=>{
    tarefas.push(req.body.tarefa)
    res.render('index',{tarefasList:tarefas})
})

app.get('/',(req,res)=>{
    res.render('index',{tarefasList:tarefas})
});

app.get('/deletar/:id',(req,res)=>{
    tarefas = tarefas.filter((val,index)=>{
        if(index != req.params.id){
            return val;
        }
    })
    res.render('index',{tarefasList:tarefas})
});

app.listen(5000,()=>{
    console.log('rodando...');
})