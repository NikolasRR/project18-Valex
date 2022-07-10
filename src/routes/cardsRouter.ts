import { Router } from "express";

import * as controllers from "../controllers/cardsController.js";
import * as middleware from "../middlewares/cardsMiddleware.js"

const cardsRouter = Router();

cardsRouter.post('/cards/create', middleware.validationForCreation, controllers.createCard);
cardsRouter.post('/cards/activate', middleware.validationForActivation, controllers.activateCard);


export default cardsRouter;