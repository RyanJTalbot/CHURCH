import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		name: { type: String, required: true, trim: true },
		passwordHash: { type: String, required: true },

		isVerified: { type: Boolean, default: false },
		emailVerifyTokenHash: { type: String, default: null },
		emailVerifyTokenExpiresAt: { type: Date, default: null },
	},
	{ timestamps: true },
);

export default mongoose.model('User', userSchema);
