// NPM
const {DataTypes} = require("sequelize")
const path = require('path')
const { readFileSync } = require('fs')
const bcrypt = require('bcrypt')

// Files
const sequelize = require("./db")
const {cleanOnStartUp, loadMockupData} = require("../config/db")

const User = sequelize.define('user', {
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

class Users {
    static async init() {
        if(cleanOnStartUp) {
            await User.drop()
                .then(res => {
                    console.log('THE TABLE DROPPED')
                })
                .catch(err => console.log(`ERROR DROP THE TABLE: ${err}`))
        }

        await User.sync({ force: true })
            .then(() => 'THE TABLE "USERS" HAS BEEN CREATED')
            .catch((err) => `ERROR CREATING THE TABLE: ${err}`)

        if(loadMockupData) {
            const filePath = path.join(__dirname, 'mockups/users.json')
            const mockups = JSON.parse(readFileSync(filePath))
            for (const item of mockups) {
                item.password = await bcrypt.hash(item.password, 5)
                await User.create(item)
                    .then(() => console.log('USER UPLOADED'))
                    .catch((err) => console.log(`USER UPLOAD ERROR: ${err}`))
            }
        }

        console.log('THE TABLE IS INITIALIZED')
    }
}

module.exports = {
    User, Users
}