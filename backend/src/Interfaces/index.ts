import { Request } from "express";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    isDeleted: boolean;
}

export interface ExtendedRequest extends Request {
    body: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        address: string;
        isDeleted: boolean;
    };
    params: {
        id: string;
    };
}

export interface Product {
    id: string;
    productName: string;
    description: string;
    longDescription: string;
    price: number;
    category: string;
    stock: number;
}

export interface ExtendedProductRequest extends Request {
    body: {
        id: string;
        productName: string;
        description: string;
        longDescription: string;
        unitPrice: number;
        discount: number;
        category: string;
        stock: number;
    };
    params: {
        id: string;
    };
}