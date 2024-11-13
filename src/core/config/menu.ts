import { RootStackParamList } from "@router"

type RouterPage = {
    pageName: keyof RootStackParamList,
    pageProps: { [key: string]: any }
    icon: string
    title: string
}


export const menu: RouterPage[] = [
]