export const homePageRouteProps = { href: '/' }
export const dashboardPageRouteProps = { href: '/dashboard' }
export const mealDetailsPageProps = ({ query, id }: any) => ({ href: `/meal_details/[id]`, as: `/meal_details/${id}` })
/* export const aboutPageRouteProps = { href: `/acerca-de` }
export const branchesPageRouteProps = { href: `/sucursales` }
export const contactPageRouteProps = { href: `/contacto` }
export const shopPageRouteProps = { href: `/shop` }
export const workWithUsPageRouteProps = { href: `/trabaja-con-nosotros` }
 */
