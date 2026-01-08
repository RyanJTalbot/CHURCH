import mongoose from 'mongoose';

export async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('✅ MongoDB connected');
		console.log('🔎 Connected host:', mongoose.connection.host);
		console.log('🔎 Connected db:', mongoose.connection.name);
	} catch (err) {
		console.error('❌ MongoDB connection failed:', err.message);
		process.exit(1);
	}
}
