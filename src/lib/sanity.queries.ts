import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)[0..5]`
export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const allPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(allPostsQuery)
}


export const homepageQuery = groq`*[_type == "home"][0]`
export async function getHomepage(client: SanityClient): Promise<Homepage> {
  return await client.fetch(homepageQuery)
}

export const aboutQuery = groq`*[_type == "about"][0]`
export async function getAbout(client: SanityClient): Promise<About> {
  return await client.fetch(aboutQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`
export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}

export interface Homepage {
  _type: 'home'
  _id: string
  _createdAt: string
  title?: string
  subtitle?: string
  description?: string
  image?: ImageAsset
}

export interface About {
  _type: 'about'
  _id: string
  _createdAt: string
  title: string
  meta_title: string
  meta_description: string
  body: PortableTextBlock[]
}
