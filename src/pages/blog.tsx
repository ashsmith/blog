import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  return (
    <Container>
      <Head>
        <title>Blog - Ash Smith - Senior Software Engineer. Bath, UK</title>
        <meta name="description" content="Senior Software Engineer. Bath, UK" />
      </Head>
      <div className="bg-white rounded-lg overflow-hidden md:ring-1 ring-slate-900/5 flex p-1 md:p-8 mb-5">
        <div className="min-w-0 py-0.5">
          <h1 className="text-xl font-bold leading-loose text-gray-900 sm:text-2xl mb-2">
            Blog
          </h1>
          <p className="leading-loose font-normal text-gray-900">
            My mishmash of things I have found useful over the years.
          </p>
        </div>
      </div>
      <section>
        {posts.length &&
          posts.map((post) => <Card key={post._id} post={post} />)}
      </section>
    </Container>
  )
}
