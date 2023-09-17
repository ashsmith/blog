import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { About, aboutQuery, getAbout } from '~/lib/sanity.queries'
import { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    about: About
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const about = await getAbout(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      about,
    },
  }
}

export default function AboutPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [about] = useLiveQuery<About>(props.about, aboutQuery)
  return (
    <Container>
      <Head>
        <title>{about.meta_title}</title>
        <meta name="description" content={about.meta_description} />
      </Head>
      <div className="bg-white rounded-lg overflow-hidden md:ring-1 ring-slate-900/5 flex p-1 md:p-8 mb-5">
        <div className="min-w-0 py-0.5">
          <h1 className="text-xl font-bold leading-loose text-gray-900 sm:text-2xl mb-2">
            {about.title}
          </h1>

        </div>
      </div>
      <section>
      <PortableText
              value={about.body}
              onMissingComponent={(e) => console.log(e)}
              components={{
                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                },
                block: {
                  blockquote: ({ children }) => (
                    <blockquote className="text border-l-4 p-4 my-4 bg-slate-50">
                      {children}
                    </blockquote>
                  ),
                  normal: ({ children }) => (
                    <p className="text leading-loose mb-4 break-words">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-4xl mb-2 font-extrabold">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl my-2 mt-4 font-extrabold">
                      {children}
                    </h2>
                  ),
                },
              }}
            />
      </section>
    </Container>
  )
}
