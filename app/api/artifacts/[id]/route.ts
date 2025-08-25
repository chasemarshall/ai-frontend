import prisma from "@/lib/db";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const art = await prisma.artifact.findUnique({
    where: { id: params.id },
    include: { versions: true },
  });
  if (!art) return new Response("not found", { status: 404 });
  return Response.json({ artifact: art });
}
