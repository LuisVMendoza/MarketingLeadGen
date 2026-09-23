import assert from "node:assert/strict";
import { onRequest } from "../functions/_middleware.js";

async function check(path, password, authorization) {
  let reachedAssets = false;
  const headers = authorization ? { Authorization: authorization } : {};
  const response = await onRequest({
    request: new Request(`https://example.pages.dev${path}`, { headers }),
    env: password === undefined ? {} : { SITE_PASSWORD: password },
    next: async () => {
      reachedAssets = true;
      return new Response("site content", { status: 200 });
    },
  });
  return { response, reachedAssets };
}

const password = "temporary-password";
const authorized = `Basic ${btoa(`preview:${password}`)}`;

for (const path of ["/", "/v2/automations", "/assets/index.js"]) {
  const missing = await check(path, password);
  assert.equal(missing.response.status, 401);
  assert.equal(missing.reachedAssets, false);
  assert.match(missing.response.headers.get("WWW-Authenticate"), /^Basic /);

  const wrong = await check(path, password, "Basic cHJldmlldzp3cm9uZw==");
  assert.equal(wrong.response.status, 401);
  assert.equal(wrong.reachedAssets, false);

  const correct = await check(path, password, authorized);
  assert.equal(correct.response.status, 200);
  assert.equal(correct.reachedAssets, true);
  assert.equal(
    correct.response.headers.get("Cache-Control"),
    "private, no-store",
  );
}

const noSecret = await check("/", undefined, authorized);
assert.equal(noSecret.response.status, 503);
assert.equal(noSecret.reachedAssets, false);

console.log("Password gate protects pages and assets and fails closed.");
