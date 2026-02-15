export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  const phone = new URL(req.url).searchParams.get("phone");

  if (!phone) {
    return new Response(JSON.stringify({ error: "phone missing" }), {
      headers: { "content-type": "application/json" }
    });
  }

  try {
    const api = await fetch(
      "https://api.impossible-world.xyz/api/data?phone=" + phone
    );

    const data = await api.text();

    return new Response(data, {
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: "proxy failed" }), {
      headers: { "content-type": "application/json" }
    });
  }
}
