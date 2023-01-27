const express = require("express");
const https=require("https");

const bodyParser = require('body-parser');
const { response } = require("express");



const app=express();

app.use(bodyParser.urlencoded({extended:"true"}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const typeP=req.body.jokeName;
    const type = "Single"

    // https://v2.jokeapi.dev/joke/Programming?type=single

    const apiUrl="https://v2.jokeapi.dev/joke/"+typeP + "&type="+type ;

    https.get(apiUrl,function(response){
        console.log(response);

        response.on("data",function(data){
            const jokeData=JSON.parse(data);
            const coder = jokeData.joke;

            res.write("<p>The joke is:</p>");
            res.write("<h1>joke "+ coder+ "</h1>");

            res.send();
        })
    })


})

app.listen(3000,function(){
    console.log("running at 3000");
})