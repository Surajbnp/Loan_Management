const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  terms: {
    type: Number,
    required: true,
  },
  doa: {
    type: String,
    default: new Date(),
  },
  loanId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: "pending",
  },
  emi: {
    type: Array,
    required: true,
  },
  emiAmount : {
    type : Number,
    required : true
  }
});

const LoanModel = mongoose.model("Loan", loanSchema);

module.exports = { LoanModel };
