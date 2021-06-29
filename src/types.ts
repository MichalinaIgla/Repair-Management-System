export type Order = {
    "id": string,
    "product": {
        "category": string,
        "name": string,
        "defect": string
    },
    "owner":{
        "firstname" : string,
        "lastname": string,
        "phone": string,
        "email": string
    },
    "receiveddate": string,
    "receiptdate": string,
    "status": string,
    "employee": string | null,
    "price": number,
    "description": String
};

export type User = {
    "username": string,
    "firstname": string,
    "lastname": string,
    "email": string,
    "id": string
}
