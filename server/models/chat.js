const sequelize = require("./db");
const {DataTypes} = require("sequelize");
const {cleanOnStartUp, loadMockupData} = require("../config/db");
const path = require("path");
const fs = require("fs");

const Chat = sequelize.define('chat', {
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

class Chats {
    static async init() {
        if(cleanOnStartUp) {
            await Chat.drop().then(() => {
                console.log('TABLE \'CHATS\' DROPPED')
            }).catch(err => console.log(`ERROR WHEN DROPPING THE TABLE "CHAT": ${err}`))
        }
        await Chat.sync({ force: true }).then(() => {
            console.log('THE "CHATS" TABLE HAS BEEN CREATED')
        }).catch((err) => console.log(`ERROR CREATING THE "CHATS" TABLE: ${err}`))

        if(loadMockupData) {
            const filePath = path.join(__dirname, 'mockups/chats.json')
            const mockups = JSON.parse(fs.readFileSync(filePath))
            mockups.map(async (item) => {
                await Chat.create(item).then(() => {
                    console.log('THE MOCKUP OF THE CHAT IS LOADED')
                }).catch((err) => console.log(`ERROR LOADING THE CHAT MOCKUP: ${err}`))
            })
        }
    }
}

module.exports={
    Chat, Chats
}