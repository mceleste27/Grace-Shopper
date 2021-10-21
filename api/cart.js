const apparelCartRouter = require('express').Router();
const {getApparelCartById, getApparelCartByUserId, updateApparelQuantity} = require('../db');

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

  module.exports = apparelCartRouter;