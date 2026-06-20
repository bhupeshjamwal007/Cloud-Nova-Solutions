import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, mobile, services, message } = data;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create a +alias for the from address to trick Gmail into not grouping it as "me"
    const aliasEmail = process.env.EMAIL_USER.replace('@', '+website@');

    // 1. Email to Cloud Nova Solutions (The Owner Notification)
    const mailToOwner = {
      from: `"${name} (New Lead)" <${aliasEmail}>`,
      sender: email,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Lead: ${name} - Cloud Nova Website`,
      text: `
New Contact Form Submission!

Name: ${name}
Email: ${email}
Phone: ${mobile}
Services: ${services || 'None selected'}

Project Details:
${message}
      `,
    };

    // 2. Auto-response to the User (The Thank You Email)
    const mailToUser = {
      from: `"Cloud Nova Solution" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out to Cloud Nova Solution!",
      text: `Hi ${name || 'there'},

Thank you for reaching out to Cloud Nova Solution!

We’ve successfully received your inquiry regarding ${services || "our services"}. It is exciting to see local businesses taking steps to grow online, and we’re ready to help you make it happen.

What happens next?
Review: A dedicated tech expert from our team is reviewing your project details right now.
Response: We will reach out to you via email or phone within 24 business hours to discuss your goals or set up a quick, free discovery call.

In the meantime, feel free to visit our website here: https://cloudnova-solution.com

If your project is urgent and you want to speak with us right away, you can reply directly to this email.

Looking forward to building something great together!

Best regards,
The Cloud Nova Solution Team
https://cloudnova-solution.com
`,
    };

    // Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToUser)
    ]);

    return NextResponse.json({ success: true, message: "Emails sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to send email" }, { status: 500 });
  }
}
