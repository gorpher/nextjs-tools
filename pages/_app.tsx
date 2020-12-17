import '../styles/global.css'
import "../node_modules/bulma/css/bulma.min.css"
import {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}
