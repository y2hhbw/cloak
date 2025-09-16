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
    // 获取请求的URL
    const url = new URL(event.request.url)
    
    // 从KV存储中获取静态资源
    let response = await getAssetFromKV(event)
    
    // 设置缓存控制头
    response = new Response(response.body, response)
    response.headers.set('Cache-Control', 'public, max-age=86400')
    
    // 设置安全相关的头
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Feature-Policy', "camera 'self'; microphone 'none'")
    
    return response
  } catch (e) {
    // 处理错误
    return new Response('资源未找到', { status: 404 })
  }
}