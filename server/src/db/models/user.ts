import {DataTypes} from "sequelize";
import {sequelize} from "../sequelize";

const users = [
    {
        id: 1,
        username: "root",
        password: "root",
        chats: [
            {
                usersId: [1,2],
                chatId: "rootShell"
            }
        ]
    },
    {
        id: 2,
        username: "SHELL",
        password: "shell",
        chats: [
            {
                usersId: [1,2],
                chatId: "rootShell"
            }
        ]
    }
]
export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chats: {
        type: DataTypes.ARRAY(DataTypes.JSON)
    }
})

export class Users {
    static async init() {
        await User.drop()
            .then(() => console.log('THE TABLE DROPPED'))
            .catch(err => console.log(`ERROR DROP THE TABLE: ${err}`))
        await User.sync({ force: true })
            .then(() => 'THE TABLE "USERS" HAS BEEN CREATED')
            .catch((err) => `ERROR CREATING THE TABLE: ${err}`)
        users.map(async (user): Promise<void> => {
            await User.create(user)
        })
    }
}