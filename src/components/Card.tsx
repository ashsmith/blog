import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden ring-1 ring-slate-900/5 flex p-1 mb-3 md:p-8 md:mb-5">
      <div className="relative z-10 overflow-hidden flex-none -m-1 mr-2 md:-m-8 md:mr-8 w-32 md:w-64 h-auto bg-slate-100">
        {post.mainImage && (
          <Image
            className="absolute max-w-none object-scale-down object-center w-2 md:w-full"
            src={urlForImage(post.mainImage).width(300).height(200).url()}
            width={300}
            height={200}
            alt=""
          />
        )}
      </div>
      <div className="min-w-0 py-0.5 pr-5">
        <h3 className="text-l md:text-xl font-bold leading-loose text-gray-900 mb-2">
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
