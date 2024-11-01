import { Schema, model } from "mongoose";

const contactSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            required: true,
            default: 'personal',
            enum: ['work', 'home', 'personal'],
        },
        userId: {
            type: Schema.Types.ObjectID,
            required: true,
            ref: 'users'
        },
        photo: {
            type:  String,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const ContactsCollection = model('contacts', contactSchema);
