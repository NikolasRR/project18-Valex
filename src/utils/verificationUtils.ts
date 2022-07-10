import dayjs from "dayjs";

export function verifyBlockAndExpiration(card: { expirationDate: string, isBlocked: boolean }, wrongValue: boolean) {
    const cardED = dayjs(card.expirationDate);
    const currentDate = dayjs();
    const cardIsExpired = cardED.diff(currentDate) < 0;
    if (cardIsExpired) throw { type: "card is expired", code: 401 };

    if (card.isBlocked === wrongValue) throw { type: "card is blocked", code: 401 };
}
