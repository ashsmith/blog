import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden ring-1 ring-slate-900/5 flex p-8 mb-5">
      <div className="relative z-10 overflow-hidden flex-none -m-8 mr-8 w-64 h-auto bg-slate-100">
        {post.mainImage && (
          <Image
            className="absolute max-w-none object-scale-down object-center w-full"
            src={urlForImage(post.mainImage).width(300).height(200).url()}
            width={300}
            height={200}
            alt=""
          />
        )}
      </div>
      <div className="min-w-0 py-0.5 pr-5">
        <h3 className="text-xl font-bold leading-loose text-gray-900 sm:text-2xl mb-2">
          <a href={`/post/${post.slug.current}`}>{post.title}</a>
        </h3>
        <p className="text-normal leading-loose text-gray-800">
          {post.excerpt}
        </p>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}
