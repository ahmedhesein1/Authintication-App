import { client } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTempltes.js";
import { sender } from "./mailtrap.config.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email:"ahmedhesein1790@gmail.com" }];
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
    console.log("Email Verification sent successfully",response);
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification : ${error}`);
  }
};
