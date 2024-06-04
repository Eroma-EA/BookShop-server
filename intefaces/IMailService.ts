export interface IMailService {
    sendMail({from, to, subject, html}:{from: string, to: string, subject: string, html: string}): Promise<string>;
}

