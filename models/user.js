import { Schema, model } from 'mongoose';
import { compare, genSalt, hash as _hash } from 'bcrypt';
const saltRounds = 5;

const userModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userModelSchema.methods = {
    checkPassword: function(password) {
        return compare(password, this.password);
    }
};

userModelSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
                return;
            }

            _hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    return;
                }

                this.password = hash;
                next();
            });
        });

        return;
    }
    next();
});

export default model('User', userModelSchema);