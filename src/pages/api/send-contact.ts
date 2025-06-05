import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Champs manquants" }), { status: 400 });
    }

    const emailResponse = await resend.emails.send({
      from: 'Maxime Qualité <onboarding@resend.dev>', // ou une adresse Resend test
      to: ['cloe.cordeiro@outlook.fr'],
      subject: `[Formulaire de contact] ${subject}`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (emailResponse.error) {
      console.log(emailResponse)
      console.error("Erreur Resend :", emailResponse.error);
      return new Response(JSON.stringify({ error: "Erreur d'envoi" }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: "Message envoyé avec succès." }), {
      status: 200,
    });
  } catch (err) {
    console.error("Erreur API :", err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
