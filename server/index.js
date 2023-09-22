const express = require("express");

const PORT = process.env.PORT || 8080;
const cors = require('cors');
const connection = require("./database/server");
const {userController} = require("./routes/client/user.routes")
const {authController} = require("./routes/client/signin.routes");
const { loanController } = require("./routes/client/loan.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userController)
app.use("/user", authController)
app.use('/loans', loanController)


app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`connected to database`);
  } catch (err) {
    console.log(`error connecting to db`);
  }
  console.log(`server is running on ${PORT}`);
});
