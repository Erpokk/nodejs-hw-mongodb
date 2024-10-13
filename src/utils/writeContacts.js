import { NORMALIZED_PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const writeContacts = async (updatedContacts) => {
    try {
        const data = JSON.stringify(updatedContacts, null, 2);
        await fs.writeFile(NORMALIZED_PATH_DB, data, 'utf-8');
        console.log('Contacts successfully updated.');
    } catch (err) {
        console.log(err.message);
    }

};
