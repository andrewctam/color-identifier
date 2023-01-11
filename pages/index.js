import Head from "next/head"
import App from "../components/App"

export default function Home(props) {
    return (
        <div>
            <Head>
                <title>Image Color Identifier</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <App 
                defaultUrl = {props.defaultUrl}
            />
          
        </div>
    )
}

export async function getStaticProps() {
    const url = await fetch("https://picsum.photos/350").then(res => res.url);
  
    return {
      props: {
        defaultUrl: url
      }, 
    }
  }