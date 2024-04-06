import { Resend } from "resend";
export const mail = (email, message, subject) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  return (async function () {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: `${subject}`,
      html: `<strong>${message}<strong>`,
    });

    if (error) {
      return console.log(error);
    }
    //console.log(data);
  })();
};
