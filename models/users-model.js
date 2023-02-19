const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    departmentName: {
        type: String,
    },
    designationId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    designationName: {
        type: String,
    },
    dateOfJoining: {
        type: Date
    },
    dateOfLeaving: {
        type: Date
    },
    gender: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
    },
    maritalStatus: {
        type: Boolean,
        required: true,
    },
    photo: {
        type: String
    },
    address: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    emergencyContact: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    },
    permanentStatus: {
        type: String,
        enum: [
            "INTERN", "PROVISSION", "PERMANENT"
        ]
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, { timestamps: true });


userSchema.pre("save", async function (next) {
    //here it is use for password reset
    if (!this.isModified("password")) {
        next();
    }


    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});//use this method is schema it will dicrypt password and we had to install npm i bcrypt.

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};// if password is currect it return true if password is false it return is false , arrow function is not working in schema . write a method always using "function(){}" for schema an i schema   


userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10min

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
