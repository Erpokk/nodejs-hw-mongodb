import { SORT_ORDER } from "../constants/index.js";
import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";


export const getAllContacts = async ({page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy='_id', filter={} }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();

    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    };

    // const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();

    // const  contacts = await  contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder}).exec();

    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder}).exec(),
    ]);


    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
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
