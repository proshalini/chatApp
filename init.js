const mongoose=require("mongoose");
const Chat = require("./models/chat.js");


async function main() {
    try {
        await mongoose.connect("mongodb+srv://shalini:Shalini123@whatsapp.md7omqf.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=whatsapp");

        console.log("MongoDB connected successfully!");
        console.log("Using database:", mongoose.connection.name); // Confirm correct DB
        const allChats = [
    {
        "from": "Alice",
        "to": "Bob",
        "msg": "Hey Bob, how’s it going?",
        "created_at": "2025-06-15T12:00:00Z"
    },
    {
        "from": "Charlie",
        "to": "David",
        "msg": "Meeting at 5 PM?",
        "created_at": "2025-06-15T13:30:00Z"
    },
    {
        "from": "Eve",
        "to": "Frank",
        "msg": "Check out this link!",
        "created_at": "2025-06-15T14:45:00Z"
    },
    {
        "from": "Grace",
        "to": "Helen",
        "msg": "Want to grab coffee later?",
        "created_at": "2025-06-15T15:10:00Z"
    },
    {
        "from": "Isaac",
        "to": "Jack",
        "msg": "Let’s push the code update tonight.",
        "created_at": "2025-06-15T16:00:00Z"
    },
    {
        "from": "Kevin",
        "to": "Laura",
        "msg": "Happy birthday, Laura!",
        "created_at": "2025-06-15T16:30:00Z"
    },
    {
        "from": "Mike",
        "to": "Nancy",
        "msg": "Finalizing the deployment settings now.",
        "created_at": "2025-06-15T17:20:00Z"
    },
    {
        "from": "Oliver",
        "to": "Paul",
        "msg": "Did you finish the database optimization?",
        "created_at": "2025-06-15T18:05:00Z"
    },
    {
        "from": "Quinn",
        "to": "Ryan",
        "msg": "Let’s review the logs before release.",
        "created_at": "2025-06-15T19:40:00Z"
    },
    {
        "from": "Sophie",
        "to": "Tom",
        "msg": "Thanks for the help with the bug!",
        "created_at": "2025-06-15T20:15:00Z"
    },
    {
        "from": "Uma",
        "to": "Victor",
        "msg": "Heading to the client meeting now.",
        "created_at": "2025-06-15T21:00:00Z"
    },
    {
        "from": "Wendy",
        "to": "Xander",
        "msg": "Sent you the updated documentation.",
        "created_at": "2025-06-15T21:45:00Z"
    },
    {
        "from": "Yara",
        "to": "Zane",
        "msg": "The server is back online!",
        "created_at": "2025-06-15T22:30:00Z"
    },
    {
        "from": "Aria",
        "to": "Ben",
        "msg": "Can you review the API response?",
        "created_at": "2025-06-15T23:10:00Z"
    },
    {
        "from": "Cameron",
        "to": "Danielle",
        "msg": "See you at the hackathon tomorrow!",
        "created_at": "2025-06-16T00:05:00Z"
    },
    {
        "from": "Elliot",
        "to": "Fiona",
        "msg": "I think we found the issue in the logs.",
        "created_at": "2025-06-16T01:30:00Z"
    },
    {
        "from": "George",
        "to": "Hannah",
        "msg": "Let’s catch up soon!",
        "created_at": "2025-06-16T02:00:00Z"
    },
    {
        "from": "Ian",
        "to": "Julia",
        "msg": "Finished the authentication module.",
        "created_at": "2025-06-16T03:20:00Z"
    },
    {
        "from": "Kyle",
        "to": "Lena",
        "msg": "Can we sync up on the deployment?",
        "created_at": "2025-06-16T04:40:00Z"
    },
    {
        "from": "Mason",
        "to": "Nina",
        "msg": "All set for the code review?",
        "created_at": "2025-06-16T05:50:00Z"
    }
]


       await Chat.insertMany(allChats);
        console.log("Chats inserted successfully!");

        // Verify data is stored correctly
        const insertedChats = await Chat.find({});
        console.log("Inserted Chats:", insertedChats);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close();
    }
}

main();

