// Cloudflare Pages runs this before every route, including static assets.
// Set SITE_PASSWORD as an encrypted Pages secret before publishing.
function basicAuthorization(password) {
  const bytes = new TextEncoder().encode(`preview:${password}`);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return `Basic ${btoa(binary)}`;
}

function sameText(left, right) {
  const a = new TextEncoder().encode(left);
  const b = new TextEncoder().encode(right);
  let difference = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    difference |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return difference === 0;
}

export async function onRequest({ request, env, next }) {
  const password = env.SITE_PASSWORD;
  if (typeof password !== "string" || password.length === 0) {
    return new Response("Preview is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const authorization = request.headers.get("Authorization") ?? "";
  if (!sameText(authorization, basicAuthorization(password))) {
    return new Response("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="5W preview", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    });
  }

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
