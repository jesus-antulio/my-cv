// Routing Middleware de Vercel (se ejecuta en el edge antes de servir la página estática).
// Guarda el país del visitante en una cookie para que src/scripts/cv-region.ts elija el CV
// en español o en inglés. Fuera de Vercel no se ejecuta y el script usa la zona horaria.

export const config = {
  matcher: ["/", "/en", "/en/"],
};

export default function middleware(request: Request): Response {
  const country = (request.headers.get("x-vercel-ip-country") ?? "").toUpperCase();
  const headers = new Headers({ "x-middleware-next": "1" });

  if (/^[A-Z]{2}$/.test(country)) {
    headers.append("Set-Cookie", `geo-country=${country}; Path=/; Max-Age=86400; SameSite=Lax; Secure`);
  }

  // "x-middleware-next" indica a Vercel que continúe con la respuesta normal.
  return new Response(null, { headers });
}
