import joi from "joi";

export const amountAndIdSchema = joi.object({
    cardId: joi.number().required(),
    amount: joi.number().required()
});

export const purchaseSchema = joi.object({
    cardId: joi.number().required(),
    businessId: joi.number().required(),
    password: joi.string().required(),
    amount: joi.number().required()
});
