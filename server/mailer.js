import nodemailer from 'nodemailer';

export function makeTransport() {
	const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

	if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
		throw new Error('Missing SMTP_* env vars');
	}

	return nodemailer.createTransport({
		host: SMTP_HOST,
		port: Number(SMTP_PORT),
		secure: Number(SMTP_PORT) === 465, // true for 465, false for 587
		auth: { user: SMTP_USER, pass: SMTP_PASS },
	});
}

export async function sendVerificationEmail({ to, verifyUrl }) {
	const transport = makeTransport();
	const from = process.env.SMTP_FROM || process.env.SMTP_USER;

	await transport.sendMail({
		from,
		to,
		subject: 'Verify your email',
		text: `Verify your email by clicking this link: ${verifyUrl}`,
		html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Verify your email</h2>
        <p>Click the button below to verify your email address.</p>
        <p><a href="${verifyUrl}" style="display:inline-block;padding:10px 14px;border-radius:10px;background:#7c5cff;color:white;text-decoration:none;">Verify Email</a></p>
        <p>If you didn’t request this, you can ignore this email.</p>
      </div>
    `,
	});
}
