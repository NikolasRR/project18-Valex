import joi from "joi";

export const cardDataSchema = joi.object({
    cardId: joi.number().required(),
    cardCVC: joi.string().regex(/^[0-9]{3}$/).required(),
    password: joi.string().regex(/^[0-9]{4}$/).required()
});