import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * 处理请求的事件监听器
 */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

/**
 * 处理请求并返回响应
 * @param {FetchEvent} event - 请求事件
 * @returns {Promise<Response>} - 响应
 */
async function handleRequest(event) {
  try {
    // 从KV存储中获取静态资源
    let response = await getAssetFromKV(event)
    
    // 设置缓存控制头
    response = new Response(response.body, response)
    response.headers.set('Cache-Control', 'public, max-age=86400')
    
    // 设置安全相关的头
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'")
    
    return response
  } catch (e) {
    // 处理错误
    return new Response('资源未找到', { status: 404 })
  }
}
