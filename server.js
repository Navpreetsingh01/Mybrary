if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require("express")
const app = express()
const ejs = require("ejs")
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
// const { dirname } = require("node:path")
const indexRouter = require("./routes/index")
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))


mongoose.connect(process.env.DATABASE_URL, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});

app.use("/", indexRouter)

app.listen(process.env.PORT || 80)