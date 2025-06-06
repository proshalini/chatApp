const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main().then(() => {
    console.log("connection successfull for mongodb")
})
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
let allChats=[
    {
        from: "shalini",
        to:"sham",
        msg:"how are you?",
        created_at:new Date(),
    },
    {
        from: "neha",
        to:"mahi",
        msg:"lets meet today..",
        created_at:new Date(),
    },
    {
        from: "ram",
        to:"shyam",
        msg:"you are looking handsome:)",
        created_at:new Date(),
    },
    {
        from: "simran",
        to:"sakshi",
        msg:"you look pretty <3",
        created_at:new Date(),
    },
];

Chat.insertMany(allChats);

