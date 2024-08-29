const express = require("express");
const path = require("path");
const app =  express();
const fs = require('fs');
const { log } = require("console");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
    res.render("index",{files: files});
})
});

app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
       res.render("show",{filename:req.params.filename, filedata: filedata})
    })
});

app.get("/edit/:filename",function(req,res){
   res.render("edit",{filename:req.params.filename})
});

app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/");
    })
 });
app.post("/create",function(req,res){
    var fn = req.body.title.split(' ').join('')+ ".txt" ;
   fs.writeFile(`./files/${fn}`, req.body.details, function(err){
    if(err) res.status(404).send("folder not found");
    else res.redirect("/"); 
   });
   console.log(req.body.name);
});

app.listen(3000);