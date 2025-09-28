import { Router } from 'express';
import authorize from '../middlewares/auth.middlware.js';

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res)=>res.send({title:'GET all subscription'}));

subscriptionRouter.get("/:id", (req, res)=>res.send({title:'GET subscription details.'}));

subscriptionRouter.post("/", authorize, (req, res)=>res.send({title: 'Create subscription'}));

subscriptionRouter.put("/:id", (req, res)=>res.send({title:'Update subscription'}));

subscriptionRouter.delete("/:id", (req, res)=>res.send({title:'Delete subscriptions'}));

subscriptionRouter.get("/user/:id", (req, res)=>res.send({title:'GET all user subscription'}));

subscriptionRouter.put("/:id/cancel", (req, res)=>res.send({title:'Cancel subscription'}));

subscriptionRouter.put("/upcoming-renewals", (req, res)=>res.send({title:'Get upcoming renewals'}));


export default subscriptionRouter;