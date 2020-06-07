const express = require("express")
const server = express() //executando o express no server

//pegar o banco de dados
const db = require("./database/db.js")

//configurar a pasta public
server.use(express.static("public"))//configura o servidor 

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))



//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true //atualiza o cache a cada alteração que for realizada, ex.: se alterar alguma coisa no index.html ele atualiza 
})


//configurar o caminho da minha aplicação
//página inicial
//req - requisição
//res - resposta

server.get("/", (req,res) =>{ //configuração de rota, ou seja,  get recebe uma página
  return res.render("index.html", { title:"Um titulo" }) //__dirname é o diretório da pasta onde se encontra o server.js, ou seja, na pasta src quando utilizado o send. ao trocar para render, basta usar so o caminho


})
server.get("/create-point", (req,res) =>{
  //req.query: capturar a query strings da nossa url
  //console.log(req.query)

 return res.render("create-point.html")//renderizar a pag e passar pelo motor
})

server.post("/savepoint",(req, res) => {
  //req.body: O corpo do fomulario

  //inserir dados no banco de dados

  // Inserir dados na tabela
     const query = `
         INSERT INTO places (
             image,
             name,
             address,
             address2,
             state,
             city,
             items
         ) VALUES (?,?,?,?,?,?,?);
     `

     const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
        
     ]

     function afterInsertData(err) {
         if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
         }

         console.log("Cadastrado com sucesso")
         console.log(this)

         return res.render("create-point.html", {saved: true})
     }

    db.run(query, values, afterInsertData)


})


server.get("/search", (req,res) =>{
    const search = req.query.search

    if(search == ""){
      //pesquisa vazia
      return res.render("search-results.html", { total: 0})
         //mostrar na pag html com os bancos de dados


    }


  //pegar os dados do banco de dados

  db.all(`SELECT * FROM places WHERE LIKE city = '%${search}%'`, function(err, rows) {
        if(err) {
             return console.log(err)
         }

        //console.log(rows)
        const total = rows.length

         return res.render("search-results.html",{ places: rows, total: total })
         //mostrar na pag html com os bancos de dados
     })


  
})


server.listen(3000) //Ligar o servidor
