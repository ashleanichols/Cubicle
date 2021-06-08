import { Schema, model } from 'mongoose';

const tokenBlacklistSchema = new Schema({
    token: String
});

export default model('TokenBlacklist', tokenBlacklistSchema);