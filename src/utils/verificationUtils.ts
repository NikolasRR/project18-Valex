import dayjs from "dayjs";
import bcrypt from "bcrypt";

import { findById } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { paymentsValue } from "../repositories/paymentRepository.js";
import { rechargesValue } from "../repositories/rechargeRepository.js";

export async function getCardInfo(cardId: number) {
    const card = await findById(cardId);
    if (!card) throw { type: "card not found", code: 404 };
    return card;
}

export async function verifyExpiration(expirationDate: string) {
    const cardED = dayjs(expirationDate);
    const currentDate = dayjs();
    const cardIsExpired = cardED.diff(currentDate) < 0;
    if (cardIsExpired) throw { type: "card is expired", code: 401 };
}

export async function verifyBlockState(isBlocked: boolean, wrongValue: boolean) {
    const UndesiredBlockState = isBlocked === wrongValue;
    if (UndesiredBlockState) throw { type: `card is ${wrongValue ? 'blocked' : 'unblocked'}`, code: 409 };
}

export async function verifyAPIKey(companyKey: string) {
    if (!companyKey) throw { type: "API Key missing", code: 422 };

    const company = await findByApiKey(companyKey);
    if (!company) throw { type: 'company not found', code: 404 };

    return company;
}

export async function verifyCardBalance(cardId: number) {
    const rechargesAmount = await rechargesValue(cardId);
    const purchasesAmount = await paymentsValue(cardId);

    return parseInt(rechargesAmount.total) - parseInt(purchasesAmount.total);
}

export async function verifyPassword(suppliedPassword: string, DBpassword: string) {
    const correctPassword = bcrypt.compareSync(suppliedPassword, DBpassword);
    if (!correctPassword) throw { type: "incorrect password", code: 401 };
}
