const express = require("express");
const sequelize = require("./src/util/database")

const app = express();
app.use(express.json());

sequelize.sync().then(() => "Synced to database").catch(err => console.log(err)) 

const route = require("./src/route/route")
const PORT = 3001

app.use("/", route)

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});