import { client } from "./mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { sender } from "./mailtrap.config.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email: "ahmedhesein1790@gmail.com" }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email Verification sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification : ${error}`);
  }
};
export const sendWelcomeEmail = async (email, name) => {
  const recipients = [
    {
      email: "ahmedhesein1790@gmail.com",
    },
  ];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      template_uuid: "2fe145b3-13e5-4dff-8600-7ee19baa5bdb",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });
    console.log("Welcome Email Sent Successfully", response);
  } catch (error) {
    console.error(`Error sending welcome Email`, error);
    throw new Error(`Error sending welcome Email : ${error}`);
  }
};
export const sendResetPasswordEmail = async (email, resetURL) => {
  const recipients = [{ email: "ahmedhesein1790@gmail.com" }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Reset Password email sent successfully", response);
  } catch (error) {
    console.error(`Error sending reset password`, error);
    throw new Error(`Error sending reset password : ${error}`);
  }
};
export const sendSuccessEmail = async (email) => {
  const recipients = [{ email: "ahmedhesein1790@gmail.com" }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset Password successfully sent",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Reset Password succeed email sent successfully", response);
  } catch (error) {
    console.error(`Error sending reset password succeed`, error);
    throw new Error(`Error sending reset password succeed : ${error}`);
  }
}
