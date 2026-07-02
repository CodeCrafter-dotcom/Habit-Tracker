import { useEffect, useState, type ComponentType, type JSX } from "react"

type RouteParams = Record<string, string>

interface PageProps {
    params?: RouteParams
}

type Routes = {
    [key: string]: ComponentType<PageProps>
}

interface RouterProps {
    routes: Routes
}

const matсhPath = (path: string, route: string): RouteParams | null => {
    const pathParts: string[] = path.split('/').filter(Boolean)
    const routePaths: string[] = route.split('/').filter(Boolean)

    if (pathParts.length !== routePaths.length) return null

    const params: RouteParams = {}

    for (let i: number = 0; i < routePaths.length; i++) {
        if (routePaths[i].startsWith(':')) {
            const paramsName: string = routePaths[i].slice(1)
            params[paramsName] = pathParts[i]
        } else if (routePaths[i] !== pathParts[i]) {
            return null
        }
    }

    return params
}

export const useRoute = (): string => {
    const [path, setPath] = useState<string>(window.location.pathname)

    useEffect(() => {
        const onLocationChange = (): void => {
            setPath(window.location.pathname)
        }

        window.addEventListener('popstate', onLocationChange)
        return (): void => window.removeEventListener('popstate', onLocationChange)
    }, [])

    return path
}

const Router = ({ routes }: RouterProps): JSX.Element => {
    const path: string = useRoute()
    
    for (const route in routes) {
        const params: RouteParams | null = matсhPath(path, route)

        if (params) {
            const Page: ComponentType<PageProps> = routes[route]
            return <Page params={params} />
        }
    }

    const NotFound: ComponentType<PageProps> = routes['*'] 

    return <NotFound />
}

export default Router
