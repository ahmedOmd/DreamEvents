import User from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrer = async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;
    // NOTE validation

    if (!email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Remplissez tous les champs." });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "Le mot de passe doit contenir au moins 6 caractères.",
      });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Les deux mots de passe de correspondent pas. ",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        errorMessage: "Un compte est déjà rattaché à cette addresse email.",
      });
    } else {
      // NOTE hash the password

      const salt = await bcrypt.genSalt(); // salt = chaine de caractere aleatoire
      const passwordHash = await bcrypt.hash(password, salt);

      // NOTE  save new user account in db

      const newUser = new User({ email, passwordHash });
      const savedUser = await newUser.save();



      // NOTE sign the token
      const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

      // NOTE send the token in a HTTP-only cookie

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send();
    }
    //return res.status(200).json("ok");
  } catch (err) {
    console.log(err);

    res.status(500).send();
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Remplissez tous les champs." });
    }

    // NOTE validation
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ errorMessage: "Email ou mot de passe incorrect" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res
        .status(400)
        .json({ errorMessage: "Email ou mot de passe incorrect" });
    }

    // NOTE sign the token

    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

    // NOTE send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

export const loggedIn = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.status(401).json(false);
  }
};

// function auth(req, res, next) {}
// export default auth;
