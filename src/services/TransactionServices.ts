import bcrypt from "bcrypt";

import * as businesses from "../repositories/businessRepository.js";
import * as payments from "../repositories/paymentRepository.js";
import * as recharges from "../repositories/rechargeRepository.js";
import { formatTimestamps } from "../utils/formattingUtils.js";
import { getCardInfo, verifyAPIKey, verifyBlockState, verifyCardBalance, verifyExpiration } from "../utils/verificationUtils.js";

export async function verifyAndRechargeCard(companyKey: string, cardId: number, amount: number) {
    await verifyAPIKey(companyKey);

    const card = await getCardInfo(cardId);

    if (!card.password) throw { type: "card is not active", code: 401 };

    await verifyExpiration(card.expirationDate);

    await recharges.insert({ cardId, amount });
}

export async function verifyAndPurchase(cardId: number, password: string, amount: number, businessId: number) {
    const card = await getCardInfo(cardId);
    if (!card.password) throw { type: "card is not activated", code: 401 };

    await verifyExpiration(card.expirationDate);
    await verifyBlockState(card.isBlocked, true);

    if (!bcrypt.compareSync(password, card.password)) throw { type: "incorrect password", code: 401 };

    const business = await businesses.findById(businessId);
    if (!business) throw { type: "business not registered", code: 404 };
    if (business.type !== card.type) throw { type: "business and card types are different", code: 401 };

    const balance = await verifyCardBalance(cardId);
    
    if (balance < amount) throw {type: "insufficient funds", code: 401};

    await payments.insert({cardId, businessId, amount});
}

export async function generateStatement(cardId: number) {
    const balance = await verifyCardBalance(cardId);

    const allRecharges = await recharges.findByCardId(cardId);
    const allPayments = await payments.findByCardId(cardId);

    const formatedRecharges = formatTimestamps(allRecharges);
    const formatedPayments = formatTimestamps(allPayments);


    const data = {
        balance: balance,
        transactions: formatedPayments,
        recharges: formatedRecharges
    };

    return data;
}