import {DataTypes} from "sequelize";
import {sequelize} from "../sequelize";

const chats = [
    {
        chatId: "rootShell",
        messages: [
            {
                messageText: "Hello Wolrd!",
                senderName: "root",
                userId: 1,
                messageId: "gqZUsqRR"
            },
            {
                messageText: "Ou, hello!",
                senderName: "SHELL",
                userId: 2,
                messageId: "Fq1sCA0W"
            }
        ],
        usersId: [1, 2]
    }
]

export const Chat = sequelize.define('chat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    chatId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    messages: {
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
    usersId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    }
})

export class Chats {
    static async init() {
        await Chat.drop().then(() => {
            console.log('TABLE \'CHATS\' DROPPED')
        }).catch(err => console.log(`ERROR WHEN DROPPING THE TABLE "CHAT": ${err}`))
        await Chat.sync({ force: true }).then(() => {
            console.log('THE "CHATS" TABLE HAS BEEN CREATED')
        }).catch((err) => console.log(`ERROR CREATING THE "CHATS" TABLE: ${err}`))
        chats.map(async (chat) => {
            await Chat.create(chat).then(() => {
                console.log('THE MOCKUP OF THE CHAT IS LOADED')
            }).catch((err) => console.log(`ERROR LOADING THE CHAT MOCKUP: ${err}`))
        })
    }
}