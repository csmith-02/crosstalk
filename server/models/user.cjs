const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
        trim: true,
        validate: {
            validator: validator.isAlpha,
            message: "Please provide a valid first name."
        }
    },
    last_name: {
        type: String,
        require: true,
        trim: true,
        validate: {
            validator: validator.isAlpha,
            message: "Please provide a valid last name."
        }
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email.",
        }
    },
    username: {
        type:  String,
        require: true,
        unique: true,
        validate: {
            validator: validator.isAlphanumeric,
            message: "Please provide a valid username.",
        }
    },
    password: {
        type: String,
        require: true,
        validate: {
            validator: (value) => {
                return validator.isStrongPassword(value, {
                    minLength: 8,
                    minNumbers: 1,
                    minSymbols: 1,
                    minUppercase: 1,
                });
            },
            message: "Your password does not meet strength requirements.",
        }
    }
    
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);