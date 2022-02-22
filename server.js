const express = require("express")
const mongoose = require("mongoose")
const PORT = 3000

const app = express()

mongoose.connect("mongodb://localhost:27017/blog")

app.use(express.json())
app.use("/posts", require("./routes/posts"))

app.listen(PORT, () => console.log(`The Server is running at PORT: ${PORT}`))
mongoose.connection.once("open", () => console.log("Connected to DB"))
