import dotenv from 'dotenv';
dotenv.config();
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendInvitationEmail = async (email, projectName, inviteLink) => {
  try {
    await resend.emails.send({
      from: 'DevSync <onboarding@resend.dev>', 
      to: email,
      subject: `Invitation: Join project "${projectName}" on DevSync`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1f2937; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #4F46E5;">You've Been Invited!</h2>
          <p>Hello,</p>
          <p>You have been invited to join the <strong>${projectName}</strong> project on DevSync. Collaborate with your team and manage your tasks effectively in one place.</p>
          
          <div style="margin: 35px 0; text-align: center;">
            <a href="${inviteLink}" target="_blank" rel="noopener noreferrer"
               style="background-color: #4F46E5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
               Accept Invitation
            </a>
          </div>
          
          <p style="font-size: 14px; color: #4b5563;">If the button above doesn't work, please copy and paste this link into your browser:</p>
          <p style="font-size: 13px; word-break: break-all; color: #4F46E5;">${inviteLink}</p>
          
          <hr style="border: none; border-top: 1px solid #f3f4f6; margin-top: 30px;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            This invitation link is valid for <strong>24 hours</strong>. If you were not expecting this invite, you can safely ignore this email.
          </p>
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">&copy; 2026 DevSync. All rights reserved.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false };
  }
};