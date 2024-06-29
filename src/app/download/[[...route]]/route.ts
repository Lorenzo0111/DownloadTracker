import finder from "@/lib/finder";
import type { components } from "@octokit/openapi-types";
import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/download");
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (ctx) => {
  return ctx.json(
    {
      error: true,
      message: "Specify a project",
    },
    400
  );
});

app.get("/:project", async (ctx) => {
  const project = ctx.req.param("project");
  const referer = ctx.req.header("Referer") || ctx.req.query("ref") || null;
  const file = await finder(referer, project);

  if (!file) {
    return ctx.json(
      {
        error: true,
        message: "Project not found",
      },
      404
    );
  }

  return download(file, ctx);
});

app.get("/:project/:version", async (ctx) => {
  const referer = ctx.req.header("Referer") || ctx.req.query("ref") || null;
  const project = ctx.req.param("project");
  const version = ctx.req.param("version");
  const file = await finder(referer, project, version);

  if (!file) {
    return ctx.json(
      {
        error: true,
        message: "Project or version not found",
      },
      404
    );
  }

  return download(file, ctx);
});

async function download(
  data: components["schemas"]["release-asset"],
  ctx: Context
) {
  return ctx.redirect(data.browser_download_url);
}

export const GET = handle(app);
export const POST = handle(app);
