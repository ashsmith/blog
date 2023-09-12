import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import { SlSettings } from 'react-icons/sl'

import { Code } from '~/components/Code'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  return (
    <Container>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="og:image"
          content={`https://3nrgyfm9aj.execute-api.eu-west-1.amazonaws.com/dev/hello?name=${encodeURI(
            post.title,
          )}`}
        />
        <meta name="og:title" content={post.title} />
        <meta name="twitter:site" content="@ashsmithco" />
        <meta name="twitter:creator" content="@ashsmithco" />
      </Head>
      <section className="mt-2 mb-4">
        {post.mainImage && (
          <Image
            className="post__cover"
            src={urlForImage(post.mainImage).url()}
            height={231}
            width={367}
            alt=""
          />
        )}
        <div>
          <h1 className="text-6xl font-extrabold leading-tight">{post.title}</h1>
          <p className="font-bold italic text-xl leading-loose">{post.excerpt}</p>
          <p className="font-extrabold leading-loose">{formatDate(post._createdAt)}</p>
          <div>
            <PortableText
              value={post.body}
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
                types: {
                  code: (props) => <Code {...props.value} />,
                },
              }}
            />
          </div>
        </div>
      </section>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
