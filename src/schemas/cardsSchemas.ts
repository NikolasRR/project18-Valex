import joi from "joi";

export const infoForCardCreationSchema = joi.object({
    employeeId: joi.number().required(),
    cardType: joi.string().valid("groceries", "restaurant", "transport", "education", "health").required()
});

export const cardDataSchema = joi.object({
    cardId: joi.number().required(),
    cardCVC: joi.string().regex(/^[0-9]{3}$/).required(),
    password: joi.string().regex(/^[0-9]{4}$/).required()
});