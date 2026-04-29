import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
})

export const config = {
  matcher: ['/admin/:path*'],
  // Exclude login, forgot-password and reset-password from protection
  excludedPaths: [
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
  ],
}
