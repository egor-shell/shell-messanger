import {Sequelize} from "sequelize";

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/shell_messenger')
sequelize.authenticate()
    .then(() => console.log('Connected'))
    .catch((e: Error) => console.log(e))
export default sequelize