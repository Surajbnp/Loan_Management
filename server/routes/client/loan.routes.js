const { Router } = require("express");
const loanController = Router();
const authMiddlewares = require("../../middlewares/authentication");
const { LoanModel } = require("../../models/Loan.model");
const { genreateEmis } = require("../../utils/utils");

// Route for fetching all loans
loanController.get("/", authMiddlewares, async (req, res) => {
  let { userId } = req;
  console.log(userId);
  if (req.role === "customer") {
    try {
      let data = await LoanModel.find({ loanId: userId });
      res.status(200).json({
        msg: "loan fetched",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.send("Sonething went wrong");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

// Route for creating new loans
loanController.post("/create", authMiddlewares, async (req, res) => {
  let { terms, amount } = req?.body;
  const totalEmi = genreateEmis(terms);
  const emiAmount = (amount / terms).toFixed(1);

  if (req.role === "customer") {
    try {
      let newLoan = new LoanModel({
        ...req.body,
        loanId: req.userId,
        emi: totalEmi,
        emiAmount: emiAmount,
      });
      await newLoan.save();
      res.status(200).send("Loan disbursed");
    } catch (err) {
      console.log(err);
      res.send("Something went wrong");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

module.exports = { loanController };
