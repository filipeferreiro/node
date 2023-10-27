const http = require('http');
const fs = require('fs');
const readline = require('readline');

const hostname = '127.0.0.1';
const port = 3000;



/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Qual seu nome? ',(name)=>{
    console.log('o nome do usuário é: '+name);
    rl.question('Qual a sua idade??? ',(idade)=>{
        console.log('A idade do '+name+' é '+idade);
    })
});

rl.on('close',()=>{
    console.log('adeus');
    process.exit(0);
});



fs.rename('danki.txt','dankicode.txt',(err)=>{
    console.log('arquivo alterado');
})


fs.unlink('danki.txt',(err)=>{
    console.log('arquivo deletado');
})


fs.readFile('danki.txt',(err,res)=>{
    let str = res.toString();

    //let newStr = str.split('/');
    //let newStr = str.substring(1,6);

    console.log(newStr);
});


//cria novo arquivo

fs.writeFile('danki.txt','teste danki code',(err)=>{
    if(err) throw err;
    console.log('o arquivo foi criado');
});


//cria novo arquivo ou adiciona conteúdo
fs.appendFile('danki.txt','\n outro conteúdo',(err)=>{
    if(err) throw err;
    console.log('conteudo adicionado');
});

const server = http.createServer((req,res) => {
    fs.readFile('index.html',(err,data)=>{
        res.writeHead(200,{'Content-Type':'Text/html'});
        res.write(data);
        return res.end();
    })
});

server.listen(port,hostname,()=>{
    console.log('funciona');
});
*/