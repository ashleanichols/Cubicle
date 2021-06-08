import { Schema, Types, model } from 'mongoose';

const cubeModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.length <= 370;
            },
            message: props => `${props.value} should be maximum 70 characters long.`
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(https|http):\/\/.+$/.test(value);
            },
            message: props => `${props.value} should start either with 'https' or with 'http'.`
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 1 && value <= 6;
            },
            message: props => `${props.value} should be a value between 1 and 6 inclusive.`
        }
    },
    accessories: [{ type: Types.ObjectId, ref: 'Accessories' }],
    creatorId: { type: Types.ObjectId, ref: 'User' }
});

/*
 * accessible model property that is NOT persisted in the database
cubeModelSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
})
*/

export default model('Cube', cubeModelSchema);