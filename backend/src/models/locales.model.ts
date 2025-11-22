import mongoose from "mongoose";

export interface LocaleTypes {
    language: mongoose.Schema.Types.ObjectId;
    key: string;
    value: string;
}

const localeSchema = new mongoose.Schema<LocaleTypes>({
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: [true, "Language reference is required"]
    },
    key: {
        type: String,
        required: [true, "Translation key is required"],
        trim: true,
        maxlength: 200
    },
    value: {
        type: String,
        required: [true, "Translation value is required"],
        trim: true
    }
}, {
    timestamps: true
});

const localeModel = mongoose.models?.Locale as mongoose.Model<LocaleTypes> ||
    mongoose.model<LocaleTypes>("Locale", localeSchema);

export default localeModel;