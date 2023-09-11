import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getHomepage,
  getPosts,
  Homepage,
  type Post,
  postsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    homepage: Homepage
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)
  const homepage = await getHomepage(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      homepage,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  return (
    <Container>
      <div className="bg-white rounded-lg overflow-hidden ring-1 ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/5 dark:ring-0 flex p-8 mb-5">
        <div className="relative z-10 overflow-hidden flex-none -m-8 mr-8 w-64 h-auto">
          <Image
            className="absolute max-w-none object-cover bg-slate-100 -ml-12 -mt-12"
            src={urlForImage(props.homepage.image).width(350).height(350).url()}
            alt="Picture of the author"
            width={350}
            height={350}
          />
        </div>
        <div className="min-w-0 py-0.5 pr-5">
          <h1 className="text-xl font-bold leading-loose text-gray-900 sm:text-2xl mb-2">
            {props.homepage.title}
          </h1>
          <p className="leading-loose font-normal text-gray-900">
            {props.homepage.description}
          </p>
        </div>
      </div>
      <section>
        {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : (
          <Welcome />
        )}
      </section>
    </Container>
  )
}
