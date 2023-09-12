import Head from 'next/head'

import Container from '~/components/Container'

export default function IndexPage() {
  return (
    <Container>
      <Head>
        <title>About - Ash Smith - Senior Software Engineer. Bath, UK</title>
        <meta name="description" content="Senior Software Engineer. Bath, UK" />
      </Head>
      <div className="bg-white rounded-lg overflow-hidden md:ring-1 ring-slate-900/5 flex p-1 md:p-8 mb-5">
        <div className="min-w-0 py-0.5">
          <h1 className="text-xl font-bold leading-loose text-gray-900 sm:text-2xl mb-2">
            About
          </h1>
          <p className="leading-loose font-normal text-gray-900">
            Who even am I anyway?
          </p>
        </div>
      </div>
      <section>Coming soon...</section>
    </Container>
  )
}
