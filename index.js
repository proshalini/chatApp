const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");
const { error } = require("console");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
main().then(() => {
    console.log("connection successfull for mongodb")
})
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect("mongodb+srv://shalini:Shalini123@whatsapp.md7omqf.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=whatsapp");
}

function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
};
app.get("/", (req, res) => {
    res.send("request received for root page");
})

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("allchats", { chats });
})

//create route
app.get("/chats/new", (req, res) => {
    res.render("new");
})

app.post("/chats", async (req,res,next) => {
    try{
        let { from: newfrom, to: newto, msg: newmsg } = req.body;
        let newChat = new Chat({
            from: newfrom,
            to: newto,
            msg: newmsg,
            created_at: new Date(),
        });
        await newChat.save();
        //     .then(res => { console.log("new chat saved", res); })
        //     .catch(err => { console.log("error in database", err); })
        res.redirect("/chats");
    }catch(err){
        next(err);
    }
});

app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        return next(new ExpressError(401, "chat not found"));
    }
    res.render("show", { chat });
}));

//edit route
app.get("/chats/:id/edit", asyncWrap(async (req, res, next) => {
  
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if (!chat) {
            next(new ExpressError(401, "chat not found"));
        }
        res.render("edit", { chat });
}))
app.put("/chats/:id", asyncWrap(async (req, res) => {
        let { id } = req.params;
        let { msg: editted } = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id, { msg: editted }, { runValidators: true, new: true });
        console.log(updatedChat);
        res.redirect("/chats");
    
}))

app.delete("/chats/:id", (req, res) => {
        let { id } = req.params;
        Chat.findByIdAndDelete(id, { runValidators: true, new: true })//this returns deleted chat
            .then(res => { console.log("Deleted chat is:\n", res) })
            .catch(err => { console.log("error in databse ", err) });
        res.redirect("/chats");
})
const handleValidationError=(err)=>{
    console.log("This is a validation error.follow the next steps");
    console.dir(err.message);
    return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==="ValidationError"){
        err=handleValidationError(err);
    }
    next(err);
})
app.use((err, req, res, next) => {
    let { status = 500, message = "page not found" } = err;
    res.status(status).send(message);
})
app.listen(port, () => {
    console.log("server is listening at port");
})