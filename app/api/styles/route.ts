import prisma from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  const items = await prisma.stylePreset.findMany({ orderBy:{ name: "asc" } });
  return Response.json({ items });
}
