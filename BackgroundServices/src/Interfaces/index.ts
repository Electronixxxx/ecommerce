export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    isDeleted: boolean;
}

export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html: string;
}

export interface MailConfig {
    host: string;
    service: string;
    port: number;
    auth: {
        [k: string]: string;
    };
}
