import prisma from "@/lib/db";
import { routerChat } from "@/lib/router";

export async function POST(
  _: Request,
  { params }: { params: { versionId: string } }
) {
  const v = await prisma.artifactVersion.findUnique({
    where: { id: params.versionId },
    include: { artifact: true },
  });
  if (!v) return new Response("not found", { status: 404 });
  if (!v.modelName)
    return new Response("no model pinned", { status: 400 });

  const run = await prisma.run.create({
    data: { projectId: v.artifact.projectId, status: "running" },
  });

  const r = await routerChat({
    model: v.modelName,
    messages: [{ role: "user", content: v.contentText ?? "Re-run context missing" }],
    params: v.paramsJson as any,
  });
  const data = await r.json();

  await prisma.run.update({
    where: { id: run.id },
    data: { status: "done" },
  });

  return Response.json({ runId: run.id, output: data });
}
