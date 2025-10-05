function renderBody(status, content) {
    return new Blob([`
    <script>
        const receiveMessage = (message) => {
            window.opener.postMessage(
                'authorization:github:${status}:${JSON.stringify(content)}',
                message.origin
            );
            window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
    </script>
    `]);
}

export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const client_id = env.GITHUB_CLIENT_ID;
    const client_secret = env.GITHUB_CLIENT_SECRET;

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ client_id, client_secret, code }),
        });

        const result = await response.json();
        if (result.error) {
            return new Response(renderBody('error', result), { status: 401 });
        }

        const token = result.access_token;
        return new Response(renderBody('success', { token, provider: 'github' }), { status: 200 });
    } catch (err) {
        return new Response(renderBody('error', { message: err.message }), { status: 500 });
    }
}
