var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// NPM
import { DataTypes } from "sequelize";
// Filed
const sequelize = require('./db');
const { cleanOnStartUp, loadMockupData } = require("../config/db");
const path = require("path");
const { readFileSync } = require("fs");
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
});
export class Users {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (cleanOnStartUp) {
                yield UserModel.drop().then(() => {
                    console.log('TABLE "CHATS" DROPPED');
                }).catch(err => console.log(`ERROR WHEN DROPPING THE TABLE "CHAT": ${err}`));
            }
            yield UserModel.sync({ force: true }).then(() => {
                console.log('THE "CHATS" TABLE HAS BEEN CREATED');
            }).catch((err) => console.log(`ERROR CREATING THE "CHATS" TABLE: ${err}`));
            if (loadMockupData) {
                const filePath = path.join(__dirname, 'mockups/users.json');
                const mockups = JSON.parse(readFileSync(filePath).toString());
                mockups.map((item) => __awaiter(this, void 0, void 0, function* () {
                    yield UserModel.create(item).then(() => {
                        console.log('THE MOCKUP OF THE CHAT IS LOADED');
                    }).catch((err) => console.log(`ERROR LOADING THE CHAT MOCKUP: ${err}`));
                }));
            }
        });
    }
}
//# sourceMappingURL=user.js.map