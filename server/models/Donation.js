import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
	{
		amount: { type: Number, required: true, min: 1 },
		donorName: { type: String, trim: true },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional link to logged-in user
	},
	{ timestamps: true },
);

export default mongoose.model('Donation', donationSchema); // collection: donations
