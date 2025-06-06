const express=require("express");
const app=express();
const port=8080;
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
main().then(()=>{
    console.log("connection successfull for mongodb")
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/",(req,res)=>{
    res.send("request received for root page");
})
//index route
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    res.render("allchats",{chats});
})
//create route
app.get("/chats/new",(req,res)=>{
    res.render("new");
})

app.post("/chats",(req,res)=>{
    let{from:newfrom,to:newto,msg:newmsg}=req.body;
    let newChat=new Chat({
        from:newfrom,
        to:newto,
        msg:newmsg,
        created_at:new Date(),
    });
    newChat.save()
    .then(res=>{console.log("new chat saved",res);})
    .catch(err=>{console.log("error in database",err);})
    res.redirect("/chats");
})

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let id=req.params.id;
    let chat=await Chat.findById(id);
    res.render("edit",{chat});
})
app.put("/chats/:id" ,async (req,res)=>{
    let {id}=req.params;
    let {msg:editted}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id ,{msg:editted},{runValidators:true ,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})

app.delete("/chats/:id",(req,res)=>{
    let {id}=req.params;
    Chat.findByIdAndDelete(id,{runValidators:true, new:true})//this returns deleted chat
    .then(res=>{console.log("Deleted chat is:\n",res)})
    .catch(err=>{console.log("error in databse ",err)});
    res.redirect("/chats");
})
app.listen (port,()=>{
    console.log("server is listening at port");
})