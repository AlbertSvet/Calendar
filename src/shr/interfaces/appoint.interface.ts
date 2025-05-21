export interface IAppoint {
    "id": number,
    "date": string,
    "name": string,
    "service": string,
    "phone": string,
    "canceled": boolean
}

export interface AtctiveAppoint extends Omit<IAppoint, 'canceled'>{}