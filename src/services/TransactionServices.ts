import { insert } from "../repositories/rechargeRepository.js";
import { getCardInfo, verifyAPIKey, verifyExpiration } from "../utils/verificationUtils.js";

export async function verifyAndRechargeCard(companyKey: string, cardId: number, amount: number) {
    await verifyAPIKey(companyKey);

    const card = await getCardInfo(cardId);

    if (!card.password) throw { type: "card is not active", code: 401 };

    verifyExpiration(card.expirationDate);

    await insert({cardId, amount});
}