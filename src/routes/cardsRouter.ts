import { Router } from "express";

import * as controllers from "../controllers/cardsController.js";
import * as middleware from "../middlewares/cardsMiddleware.js";

const cardsRouter = Router();

cardsRouter.post('/cards/create', middleware.verifyCompanyKey, middleware.validationForCreation, controllers.createCard);
cardsRouter.post('/cards/activate', middleware.validationForActivation, controllers.activateCard);
cardsRouter.post('/cards/block', middleware.validateIdAndPassword, controllers.blockCard);
cardsRouter.post('/cards/unblock', middleware.validateIdAndPassword, controllers.unblockCard);

export default cardsRouter;