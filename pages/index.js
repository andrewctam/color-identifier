import Head from "next/head"
import App from "../components/App"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Image Color Identifier</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <App />
          
        </div>
    )
}
