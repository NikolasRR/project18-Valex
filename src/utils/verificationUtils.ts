import dayjs from "dayjs";

import { findById } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";

export async function getCardInfo(cardId: number) {
    const card = await findById(cardId);
    if (!card) throw { type: "card not found", code: 404 };
    return card;
}

export function verifyExpiration(expirationDate: string) {
    const cardED = dayjs(expirationDate);
    const currentDate = dayjs();
    const cardIsExpired = cardED.diff(currentDate) < 0;
    if (cardIsExpired) throw { type: "card is expired", code: 401 };
}

export async function verifyBlockState(isBlocked: boolean, wrongValue: boolean) {
    const UndesiredBlockState = isBlocked === wrongValue;
    if (UndesiredBlockState) throw { type: `card is already ${wrongValue ? 'blocked' : 'unblocked'}`, code: 409 };
}

export async function verifyAPIKey(companyKey: string) {
    if (!companyKey) throw { type: "API Key missing", code: 422 };

    const company = await findByApiKey(companyKey);
    if (!company) throw { type: 'company not found', code: 404 };

    return company;
}
