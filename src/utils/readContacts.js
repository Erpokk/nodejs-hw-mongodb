import { NORMALIZED_PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const readContacts = async () => {
    try {
        const data = await fs.readFile(NORMALIZED_PATH_DB, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`${err.message} unable to reach ${NORMALIZED_PATH_DB}`);
    }
};


