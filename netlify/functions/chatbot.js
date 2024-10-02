const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        const data = await response.json();
        console.log(data); // Log la réponse de l'API pour vérification
        return {
            statusCode: 200,
            body: JSON.stringify({ response: data.choices[0].message.content }),
        };
    } catch (error) {
        console.error('Erreur lors de l’appel à l’API OpenAI:', error); // Affiche l'erreur si une erreur se produit
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erreur lors de l’appel à l’API OpenAI' }),
        };
    }
};
