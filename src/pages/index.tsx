import { BatchEvaluateFeatureCommand, EvaluateFeatureCommand,EvidentlyClient } from "@aws-sdk/client-evidently";
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import { useEffect } from "react";

import Card from '~/components/Card'
import Container from '~/components/Container'
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
  const client = new EvidentlyClient({
    region: 'eu-west-1',
    credentials: {
      accessKeyId: 'ASIAQYP6RMK77DF3S246',
      secretAccessKey: 'COvXLbuzucpH6Mjr+kAmAMMQ+xtVYMr1JUFp2cjK',
      sessionToken: 'IQoJb3JpZ2luX2VjEHoaCWV1LXdlc3QtMSJHMEUCIC1HQL2yty1ykn6vjHYRDSDcwVjtj0TJ08EWAZwY3kMAAiEAkTn0FN8a2FROeEjOxNAvA9nDnmw1qMbma0cabSo2+Loq+gIIcxAFGgwwNTI2MTAyOTQ0NjMiDNVPOm9YAMvyH+6WfCrXAj46l0uScHcOOJT4gbhbX1laERvxolXh7LSj5UId1XLheAWDY7c1XHMMnjwiZp6zcu784WQzLSIr5oxQ++eiUwdPkjON8ZDrMXvPouA9ghelZAgNNNI228qiC72XsDXblsQsdmpQiEkXyFhzXcIl7KmEp4yxq+9aNXvOMPZlWpJfOtlpWiI33LYLToGDekQeFtrwJANT205WPfFsstb0FiiI9B1hpeQQMg2EffKMTsxI7VN6U/D277st8xidcBCDuUA9nuUiXRC06nprM2OvxBzlArEFyxFRsmZdEAGX9e3OggUb+jxaZk2n9iSdmDmgPWLCw21VVyH6SHFtE9qjNbpMa+ZQTNzz3KXyOnXybGpM8D2TDiScU/+KTSVYGoZ/3E2eLA9zrwrjxeP0B37RuoO0yrnhSl9mi/dxR2WBnfRRgGjd8lBOMzhv5L22pLygwjBWPvRKwfEwucXKqAY6pgHNRZwISVbHSumz3AkoXylsw4xWddAYfO5fZ5jul60T2qpR9Ie/Zoc4BiP0mmtaIG2UZxeRP1eNavzoc8smJUISGCMBHLDrDZYxzvJhP0D9kjo+VjvMaZJiFgHQSIRAK8HkYevtltoUFAec7HYTxs//3KtzNhEOkLufDcCCaKguobw7uao8nAdXxhsScdofC2NSLpdqvU20BrxX2kysgPgXeTmey23U',
    }
  });
const command = new BatchEvaluateFeatureCommand({
  project: "AshTest",
  requests: [
    { // EvaluateFeatureRequest
      entityId: 'myId',
      feature: "AllowSignUp",
      evaluationContext: JSON.stringify({ Price: 15 }),
    },
    {
      entityId: 'myId',
      feature: "Login",
      evaluationContext: JSON.stringify({ Price: 15 }),
    }
  ]

});
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)

  useEffect(() => {

    client.send(command).then(result => {
      console.log(result)
    })
  });

  return (
    <Container>
      <Head>
        <title>Ash Smith - Senior Software Engineer. Bath, UK</title>
        <meta name="description" content="Senior Software Engineer. Bath, UK" />
      </Head>
      <div className="bg-white rounded-lg overflow-hidden md:ring-1 ring-slate-900/5 flex p-1 md:p-8 mb-5">
        <div className="relative z-10 hidden flex-none overflow-hidden -m-8 mr-2 md:mr-8 w-24 md:w-64 h-auto items-center inline-flex md:block">
          <Image
            className="object-cover bg-slate-100 max-w-24 md:max-w-none md:-ml-12 md:-mt-12 rounded-xl md:rounded-none"
            src={urlForImage(props.homepage.image).width(350).height(350).url()}
            alt="Picture of the author"
            width={350}
            height={350}
          />
        </div>
        <div className="min-w-0 py-0.5">
          <h1 className="text-xl font-bold leading-loose text-gray-900 sm:text-2xl mb-2">
            {props.homepage.title}
          </h1>
          <p className="leading-loose font-normal text-gray-900">
            {props.homepage.description}
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
