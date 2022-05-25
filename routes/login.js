const express = require("express");
const Jwt = require("jsonwebtoken");  //jwt
const fs = require("fs");
const router = express.Router();
const Model = require("../models/model");

var secrete = fs.readFileSync("routes/secrete.key");

router.post("/Userlogin", (req, res) => {  //هتأكد من بيانات ال user
  Jwt.sign({ Model }, secrete, async (err, token) => {
    if (!req.body.username || !req.body.password) {
      res.json({ message: "Mistake in username OR password" });
    } else {
      try {
        const data = await Model.find({
          username: req.body.username,
          password: req.body.password,
        });
        if (data != "") {  
          res.json({ data, token });
        } else {
          res.json({ message: "username or password is incorrect" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
});



router.post("/api/user", verifytoken, (req, res) => {//نتأكد من ل  Token 
  Jwt.verify(req.token, secrete, (err, data) => {
    if (err){ 
    res.sendStatus(403);
    }
    else {
      res.json({msg:"logged in successfully......#Post Created#......"})
    }
  });
});


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTM1MTMwMTR9.CI8if8Gs5HWIzn0LFF_8NHpEr2guaMApnvWxs0B_Pi4

function verifytoken(req, res, next) {
    //format of token => authorization: Bearer<token>
  const bearerheader = req.headers["authorization"];
  if (typeof bearerheader !== "undefined") {

    const bearer = bearerheader.split(" ");
    const token = bearer[1];
    //set the token
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}

exports.verifytoken = verifytoken;

module.exports = router;
