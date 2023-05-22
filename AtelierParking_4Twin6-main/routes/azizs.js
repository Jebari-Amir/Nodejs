const express = require("express");
const router = express.Router();
const azizModel = require("../models/aziz");


router.post("/", async (req, res) => {
    try {
      const { nom, prenom, age } = req.body;
      const checkIfEventExist = await azizModel.findOne({ nom });
      if (checkIfEventExist) throw new Error("aziz already exist");
      if (age > 30)
        throw new Error("l age de participants doit etre <=30");
      const aziz = await azizModel.create({
        nom,
        prenom,
        age,
      });
      res.status(200).json(aziz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.get("/", async(req, res) => {
    try {
      const azizs = await azizModel.find();
      if(azizs.length === 0){
          throw new Error("azizs not found!");
      }
      res.status(200).json(azizs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nom, prenom, age } = req.body;
      let checkIfEventExist = await azizModel.findById(id);
      if (!checkIfEventExist) {
        throw new Error("aziz not found!");
      }
      checkIfEventExist = await azizModel.findOne({ nom });
      //verification sur l'existence du titre
      if (checkIfEventExist) {
        throw new Error("aziz already exist!");
      }
      //verification sur le nombre de participants
      if (age > 30) {
        throw new Error("age de aziz trop élevé!");
      }
      const updatedAziz = await azizModel.findByIdAndUpdate(
        id,
        {
          $set: { nom, prenom, age },
        },
        { new: true }
      );
      res.status(200).json(updatedAziz);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkIfEventExist = await azizModel.findById(id);
      if (!checkIfEventExist) {
        throw new Error("aziz not found!");
      }
      await azizModel.findByIdAndDelete(id);
      
      res.json("aziz deleted successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

//search by nom
  router.get("/search", async (req, res) => {
    try {
      const searchQuery = req.query.q; // Récupère la valeur du paramètre de requête "q"
      const regex = new RegExp(searchQuery, "i"); // Crée une expression régulière insensible à la casse
  
      const azizs = await azizModel.find({ nom: regex }); // Effectue la recherche avec l'expression régulière
  
      if (azizs.length === 0) {
        throw new Error("azizs not found!");
      }
  
      res.status(200).json(azizs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  //tri par age

  router.get("/sort", async (req, res) => {
    try {
      const azizs = await azizModel.find().sort({ age: 1 }); // Trie les azizs par âge croissant
  
      if (azizs.length === 0) {
        throw new Error("azizs not found!");
      }
  
      res.status(200).json(azizs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  




module.exports = router;
