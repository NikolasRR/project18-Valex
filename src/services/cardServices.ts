import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";

import { insert, TransactionTypes } from "../repositories/cardRepository.js";


export async function generateCardInfoAndCard(employee: {fullName: string, id: number}, cardType: TransactionTypes) {
    const cryptr = new Cryptr('myTotallySecretKey');
    const cardNumber = faker.finance.creditCardNumber('#### #### #### ####');
    const cardCVC = faker.finance.creditCardCVV();
    const encrytedCVC = cryptr.encrypt(cardCVC);

    const cardExpirationDate = dayjs().add(5, 'years').format('YYYY-MM-DD');

    const nameArray = employee.fullName.toUpperCase().split(' ');
    for (let i = 1; i < nameArray.length - 1; i++) {
        const nome = nameArray[i];
        if (nome.length > 2) {
            nameArray[i] = nome[0];
            continue;
        }
        nameArray.splice(i, 1);
    }

    const cardName = nameArray.join(' ');

    const cardData =  {
        employeeId: employee.id,
        number: cardNumber,
        cardholderName: cardName,
        securityCode: encrytedCVC,
        expirationDate: cardExpirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: cardType,
    };

    await insert(cardData);
    
    return;
}