const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connect = require("./config/db")
const router = require("./routes/employeeRoute")

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

connect()

app.get("/api", (req, res) => {
    res.send("Server is running")
})


app.use("/api/employees", router)

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
    console.log(`Server connected at port ${PORT}`)
})