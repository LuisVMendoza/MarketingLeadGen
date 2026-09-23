import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { resolve } from "node:path";

const vite = await createServer({
  server: { middlewareMode: true },
  resolve: {
    alias: {
      "react-router-dom": resolve(
        "node_modules/react-router-dom/dist/index.mjs",
      ),
    },
  },
  appType: "custom",
});
try {
  const { default: App } = await vite.ssrLoadModule("/src/app.tsx");
  const { MemoryRouter } = await vite.ssrLoadModule(
    "/node_modules/react-router-dom/dist/index.mjs",
  );
  const { navGroups } = await vite.ssrLoadModule("/src/data.ts");
  const paths = [
    ...new Set(navGroups.flatMap((group) => group.items.map(([path]) => path))),
  ];
  paths.push("contacts/contact-001");
  let checked = 0;
  for (const version of ["v1", "v2", "v3", "v4", "v5"]) {
    for (const path of paths) {
      const route = `/${version}/${path}`;
      const html = renderToString(
        React.createElement(
          MemoryRouter,
          { initialEntries: [route] },
          React.createElement(App),
        ),
      );
      if (!html.includes('class="page ') && !html.includes('class="page"'))
        throw new Error(`${route} rendered no page`);
      if (html.includes("Page not found") || html.includes("Contact not found"))
        throw new Error(`${route} rendered a missing page`);
      checked++;
    }
  }
  const home = renderToString(
    React.createElement(
      MemoryRouter,
      { initialEntries: ["/"] },
      React.createElement(App),
    ),
  );
  if (!home.includes("Five perspectives."))
    throw new Error("Comparison page did not render");
  const { default: PreviewGate } = await vite.ssrLoadModule(
    "/src/preview-gate.tsx",
  );
  const locked = renderToString(
    React.createElement(
      PreviewGate,
      null,
      React.createElement("div", null, "PRIVATE_PREVIEW_CONTENT"),
    ),
  );
  if (
    !locked.includes("Access the preview") ||
    locked.includes("PRIVATE_PREVIEW_CONTENT")
  )
    throw new Error("Preview gate did not conceal the app");
  console.log(
    `Rendered ${checked} nested routes, the comparison page, and the locked preview successfully.`,
  );
} finally {
  await vite.close();
}
