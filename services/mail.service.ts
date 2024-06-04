import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
// import * as MailComposer from 'nodemailer/lib/mail-composer';  
import { injectable } from "inversify";
import { IMailService } from '../intefaces/IMailService';
import { IEmail } from '../intefaces/IEmail';

@injectable()
export class MailService implements IMailService {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    public sendMail(email: IEmail): Promise<string> {
        const mail = {
            from: email.from,
            to: email.to,
            subject: email.subject,
            html: email.html
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mail, (err, info) => {
                if (err) {
                    return reject(err);
                }
                return resolve(info.messageId);
            });
        });
    }
}

