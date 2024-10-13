import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllContacts, getContactByID } from './services/contacts.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(pino({
        transport: {
            target: 'pino-pretty',
        }
    }));

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world',
        });
    });

    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await getAllContacts();
            res.json({
                status: 200,
                message: "Successfully found contacts!",
                data: contacts,
            });
        } catch (err) {
            res.status(500).json({
            message: 'Failed to get contacts',
            error: err.message,
            });
        }
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactByID(contactId);


            if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
            }

            res.status(200).json({
                data: contact,
            });
        } catch (err) {
            next(err);
        }
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not Found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
