import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true,'Email address is required'],
			unique: true,
		},
		password: {
			type: String,
			required: [true,'Password is required'],
		},
		name: {
			type: String,
			required: [true,'Name is required'],
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true }
);

export default mongoose.model("User", userSchema);
