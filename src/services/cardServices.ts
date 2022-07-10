import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import { findByTypeAndEmployeeId, findById, insert, TransactionTypes, update } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findByEmployeeIdAndCompanyId } from "../repositories/employeeRepository.js";
import { verifyBlockAndExpiration } from "../utils/verificationUtils.js";

export async function verifyCardAvailability(companyKey: string, employeeId: number, cardType: TransactionTypes) {
    if (!companyKey) throw { type: "API Key missing", code: 422 };

    const company = await findByApiKey(companyKey);
    if (!company) throw { type: 'company not found', code: 404 };

    const employee = await findByEmployeeIdAndCompanyId(employeeId, company.id);
    if (!employee) throw { type: 'employee not found or not from company', code: 404 };

    const cardExists = await findByTypeAndEmployeeId(cardType, employeeId);
    if (cardExists) throw { type: 'employee already has said card', code: 409 };

    return employee;
}

export async function generateCardInfoAndCard(employee: { fullName: string, id: number }, cardType: TransactionTypes) {
    const cryptr = new Cryptr(process.env.CRYPTR_KEY);
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

    const cardData = {
        employeeId: employee.id,
        number: cardNumber,
        cardholderName: cardName,
        securityCode: encrytedCVC,
        expirationDate: cardExpirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type: cardType,
    };

    await insert(cardData);

    return { number: cardNumber, securityCode: cardCVC };
}

export async function verifyAndActivateCard(cardId: number, cardCVC: string, password: string) {
    const cryptr = new Cryptr(process.env.CRYPTR_KEY);

    const registeredCard = await findById(cardId);
    if (!registeredCard) throw { type: "card not found", code: 404 };

    verifyBlockAndExpiration(registeredCard, true);

    if (registeredCard.password !== null) throw { type: "card is already active", code: 409 };

    const cardCVCisWrong = cryptr.decrypt(registeredCard.securityCode) !== cardCVC;
    if (cardCVCisWrong) throw { type: "security code is wrong", code: 401 };

    const hashedPassword = bcrypt.hashSync(password, 10);

    await update(cardId, { password: hashedPassword });
}

export async function verifyAndBlockCard(cardId: number, password: string) {
    const card = await findById(cardId);
    if (!card) throw { type: "card not found", code: 404 };

    verifyBlockAndExpiration(card, true);

    const correctPassword = bcrypt.compareSync(password, card.password);
    if (!correctPassword) throw { type: "incorrect password", code: 401 };

    await update(cardId, { isBlocked: true });
}

export async function verifyAndUnblockCard(cardId: number, password: string) {
    const card = await findById(cardId);
    if (!card) throw { type: "card not found", code: 404 };

    verifyBlockAndExpiration(card, false);

    await update(cardId, { isBlocked: false });
}