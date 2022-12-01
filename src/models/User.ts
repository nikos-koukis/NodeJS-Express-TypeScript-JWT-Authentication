import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface InterfaceUser extends Document {
    username: string | null;
    email: string | null;
    password: string | null;
    encryptPassword(password: string): Promise<string>
    validatePassword(password: string): Promise<boolean>
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<InterfaceUser>('User', userSchema);