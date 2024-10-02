const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // La clé API est cachée dans les variables d'environnement
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: userMessage }]
        })
    });

    const data = await response.json();
    
    return {
        statusCode: 200,
        body: JSON.stringify({ response: data.choices[0].message.content }),
    };
};
