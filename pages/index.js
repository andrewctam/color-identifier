import Head from "next/head"
import App from "../components/App"

export default function Home() {
    return (
        <div className={"p-5"}>
            <Head>
                <title>Matrix Generator</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <App />
          
        </div>
    )
}
