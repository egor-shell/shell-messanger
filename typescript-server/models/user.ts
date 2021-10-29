// NPM
import {Optional, Model} from "sequelize";
import pkg from 'sequelize';
const { DataTypes } = pkg;


// Filed
import sequelize from "./db.js";
import {cleanOnStartUp, loadMockupData} from "../config/db.js";
import path from 'path'
import { readFileSync } from "fs";
import { users } from './mockups/users.js'

interface UserAttributes {
    id: number,
    username: string,
    password: string,
    chats: {
        usersId: number[],
        chatId: string
    }[]
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {}
export const UserModel = sequelize.define("User", {
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
        if (cleanOnStartUp) {
            console.log('CLEAR')
            await UserModel.drop().then(() => {
                console.log('TABLE "CHATS" DROPPED')
            }).catch(err => console.log(`ERROR WHEN DROPPING THE TABLE "CHAT": ${err}`))
        }
        await UserModel.sync({force: true}).then(() => {
            console.log('THE "CHATS" TABLE HAS BEEN CREATED')
        }).catch((err) => console.log(`ERROR CREATING THE "CHATS" TABLE: ${err}`))
        if (loadMockupData) {
            // const filePath = users
            // const mockups: UserAttributes[] = JSON.parse(readFileSync(filePath).toString())
            users.map(async (item) => {
                await UserModel.create(item).then(() => {
                    console.log('THE MOCKUP OF THE CHAT IS LOADED')
                }).catch((err) => console.log(`ERROR LOADING THE CHAT MOCKUP: ${err}`))
            })
        }
    }
}