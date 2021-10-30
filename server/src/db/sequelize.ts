import { Sequelize } from "sequelize-typescript";
export const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/shell_messanger')
sequelize.authenticate().then(r => console.log('AUTH'))
// export const sequelize = new Sequelize({
//     dialect: "postgres",
//     host: "localhost",
//     username: "root",
//     password: "root",
//     database: "shell_messenger",
//     repositoryMode: true,
//     port: 5432,
//     define: {
//         timestamps: false,
//         underscored: true,
//     }
// })
