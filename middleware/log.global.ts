// 文件名的 global 表示全局所以路由都會執行
export default defineNuxtRouteMiddleware((to, from) => {
  // const auth = useState('auth')
  console.log('全局觸發路由')
})
