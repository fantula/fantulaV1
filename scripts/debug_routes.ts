import { adminRoutes, adminRoute, ADMIN_PREFIX } from '../nuxt-frontend/config/admin-routes'

console.log('--- ROUTE DEBUG ---')
console.log('ADMIN_PREFIX:', ADMIN_PREFIX)
console.log('adminRoute("coupons"):', adminRoute('coupons'))
console.log('adminRoute("cdk"):', adminRoute('cdk'))
console.log('adminRoutes.coupons():', adminRoutes.coupons())
console.log('adminRoutes.cdk():', adminRoutes.cdk())
console.log('adminRoutes.couponsBalance():', adminRoutes.couponsBalance())
console.log('-------------------')
