const mongoose = require("mongoose");
const azizSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
   
    prenom: String,

    age: Number,
    
  },
  { timestamps: true }
);
const aziz = mongoose.model("aziz", azizSchema);
module.exports = aziz;
