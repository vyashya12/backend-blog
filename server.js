const express = require("express")
const mongoose = require("mongoose")
const PORT = 3000
const cors = require("cors")

const app = express()

mongoose.connect("mongodb://localhost:27017/blog")

app.use(cors())
app.use(express.json())
app.use("/posts", require("./routes/posts"))

app.listen(PORT, () => console.log(`The Server is running at PORT: ${PORT}`))
mongoose.connection.once("open", () => console.log("Connected to DB"))
