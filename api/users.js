// POST  /apparel_CART
// GET / apaprel_CART

const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./secret");
const { getUserByUsername, createUser, getApparelCartById } = require("../db");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    console.log("CREATING THE USER");
    const user = await createUser({ username, password });
    if (req.body.password.length < 8) {
      res.status(401);
      next({ message: "Entered password is too short" });
    }
    console.log("User registered", +JSON.stringify(user));
    res.send({ user });
  } catch (error) {
    console.log("THERE WAS AN ERROR");
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.body.username);
    console.log(user);
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET
    );
    console.log(token);
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

apparelCartRouter.post("/", async (req, res, next) => {
  try {
    const userCart = await getApparelCartById(req.body);
    res.send(userCart);
  } catch (error) {
    next(error);
    console.log("An error has occured");
  }
});

apparelCartRouter.get("/:id", async (req, res, next) => {
    const {id} = req.params
    try { 
        const getUserCart = await getApparelCartById(id);
        res.send(getUserCart);
        
        
    } catch (error) {
        next(error)
        console.log("An error has occured")
        
    }
});

module.exports = {usersRouter,apparelCartRouter};
