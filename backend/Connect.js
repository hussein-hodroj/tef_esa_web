require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

app.use("/users", require("./routes/usersRoutes"))

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something Went Wrong",
    });
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));