import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    await db.command({ ping: 1 });

    return Response.json({ status: "ok", message: "MongoDB conectado com sucesso!" });
  } catch (error) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}