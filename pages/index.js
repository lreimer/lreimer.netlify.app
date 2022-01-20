import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>#whoami | lreimer.netlify.app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="lreimer.netlify.app" />
        <p className="description">
        Passionate developer. Proud father. #CloudNativeNerd. Will code for fun, food and drinks.
        </p>
      </main>

      <Footer />
    </div>
  )
}
