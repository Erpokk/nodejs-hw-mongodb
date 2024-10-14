import { ContactsCollection } from "../db/models/contact.js";


export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};


export const getContactById = async (contactID) => {
    const contact = await ContactsCollection.findById(contactID);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const deleteContact = async (contactID) => {
    const contact = await ContactsCollection.findByIdAndDelete(contactID);
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
    const rawRes = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawRes || !rawRes.value) {
        return null;
    }

    return {
        contact: rawRes.value,
        isNew: Boolean(rawRes?.lastErrorObject?.upserted),
    };
};
