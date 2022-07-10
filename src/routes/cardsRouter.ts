import { Router } from "express";

import * as controllers from "../controllers/cardsController.js";
import * as middleware from "../middlewares/cardsMiddleware.js";
import Cryptr from "cryptr";

const cardsRouter = Router();

cardsRouter.post('/cards/create', middleware.validationForCreation, controllers.createCard);
cardsRouter.post('/cards/activate', middleware.validationForActivation, controllers.activateCard);
cardsRouter.post('/cards/block', controllers.blockCard);
cardsRouter.post(`/cards/getcvc`, (req, res) => {
    const cryptr = new Cryptr(process.env.CRYPTR_KEY);
    const a = cryptr.decrypt(req.body.cvc);
    res.send(a)
})


export default cardsRouter;