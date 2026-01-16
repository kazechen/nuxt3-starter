// 需要在組件中指定才能執行
export default defineNuxtRouteMiddleware((to, from) => {
  // const auth = useState('auth')
  console.log('只在/路徑觸發的路由 from:')
})
