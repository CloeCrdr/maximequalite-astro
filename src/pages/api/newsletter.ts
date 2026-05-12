import base from '../../lib/airtable';

export async function POST({ request }) {
    try {
        const body = await request.json();
        const email = body.email?.trim().toLowerCase();

        if (!email) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Email manquant',
                }),
                { status: 400 }
            );
        }

        const existing = await base('Newsletter')
            .select({
                filterByFormula: `{email} = '${email}'`,
                maxRecords: 1,
            })
            .firstPage();

        if (existing.length > 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Vous êtes déjà inscrit(e) à notre newsletter',
                }),
                { status: 200 }
            );
        }

        await base('Newsletter').create([
            {
                fields: {
                    email: email,
                    "date_inscription": new Date().toISOString().split('T')[0],
                    "est_inscrit" : true,
                },
            },
        ]);

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Inscription effectuée avec succès',
            }),
            { status: 200 }
        );
    }  catch (error) {
        console.error('NEWSLETTER ERROR:', error);

        return new Response(
            JSON.stringify({
                success: false,
                error: String(error),
            }),
            {
                status: 500,
            }
        );
    }
}