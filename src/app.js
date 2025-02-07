const express = require("express");
const connectDB = require("./configs/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const app = express();

app.use(express.json());

//singup post request (Registering the the new user)

app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    const { firstName, lastName, email, password, age, gender, photoUrl, about, skills } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //create instance to the class which is User Model,(never pass req.body it is badway,goodway is to expicitly)
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      about,
      skills

    });
    // const user = new User(req.body);

    await user.save(); //it returns the promise
    res.send("Post request done successfully");

  } catch (err) {
    res.status(400).send("Error in saving userdata: " + err.message);
  }
});

//login api postrequest

app.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid");
    }

    //for comparing the login details
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login successfull");
    } else {
      throw new Error("Invalid");
    }
  } catch (err) {
    res.status(400).send("Error in saving userdata: " + err.message);
  }
});

//feed api - get/feed get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//delete - delete user api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Update - patch user api
app.patch("/user/:userId", async (req, res) => {
  // const userId = req.body.userId;
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const allowUpdates = ["about", "gender", "age", "skills", "photoUrl"];

    const isUpdateAllowed = Object.keys(data).every((k) => allowUpdates.includes(k));

    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("SKills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id : userId }, data, {
      returnDocument: "after",
      runValidators : true
    });

    console.log(user);

    res.send("User updated successfully");

  } 
  catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(7777, () => {
      console.log("server is working on this port");
    });
  })
  .catch((err) => {
    console.log("database cannot connect" + err.message);
  });
