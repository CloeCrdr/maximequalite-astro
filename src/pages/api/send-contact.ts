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

    // ici tu peux log ou envoyer l'email via un service externe (SendGrid, Mailgun, Resend, etc.)
    console.log({ name, email, subject, message });

    return new Response(JSON.stringify({ success: true, message: "Message envoyé avec succès." }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erreur d'envoi" }), { status: 500 });
  }
}
