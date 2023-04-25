export function HEAD(request: Request) {
    return new Response(null, {
        headers: { "Set-Cookie": `jwt_token=; expires=${new Date().toUTCString()}; Path=/` },
    })
}
