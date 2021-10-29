// NPM
import {Optional, Model} from "sequelize";
import pkg from 'sequelize';
const { DataTypes } = pkg;


// Filed
import sequelize from "./db.js";
import {cleanOnStartUp, loadMockupData} from "../config/db.js";
import {chats} from './mockups/chats.js'


interface ChatAttributes {
    id: number;
    chatId: string;
    messages: {
        messageText: string,
        senderName: string,
        userId: number,
        messageId: string
    }[];
    usersId: number[]
}
interface ChatCreationAttributes extends Optional<ChatAttributes, "id"> {}
interface ChatInstance
    extends Model<ChatAttributes, ChatCreationAttributes>,
        ChatAttributes {}

export const ChatModel = sequelize.define("Chat", {
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
});

export class ChatsStart {
    static async init() {
        if(cleanOnStartUp) {
            await ChatModel.drop().then(() => {
                console.log('TABLE "CHATS" DROPPED')
            }).catch(err => console.log(`ERROR WHEN DROPPING THE TABLE "CHAT": ${err}`))
        }
        // await ChatModel.sync({ force: true }).then(() => {
        //     console.log('THE "CHATS" TABLE HAS BEEN CREATED')
        // }).catch((err) => console.log(`ERROR CREATING THE "CHATS" TABLE: ${err}`))
        // if(loadMockupData) {
        //     // const mockup = JSON.parse(chats)
        //     chats.map(async (item) => {
        //         console.log(item)
        //         await ChatModel.create(item).then((data) => {
        //             console.log('THE MOCKUP OF THE CHAT IS LOADED' + data)
        //         }).catch((err) => console.log(`ERROR LOADING THE CHAT MOCKUP: ${err}`))
        //     })
        // }
    }
}