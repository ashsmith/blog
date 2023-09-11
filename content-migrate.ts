import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import axios from 'axios'
// import dotenv
import dotenv from 'dotenv'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import { marked } from 'marked'
import path from 'path'
dotenv.config({
  path: '.env.local',
})

import schema from './sanity.config'

const sanitySchema = Schema.compile(schema.schema)

const blockContentType = sanitySchema
  .get('post')
  .fields.find((field) => field.name === 'body').type

const CONTENTFUL_ACCESS_TOKEN = '_jjIusyTNDJpTSjYGtwXaWgy8PUmtEc5UOhquiZ-wXU'
/**
 * Goal is to migrate content from Contentful to Sanity.
 * We'll do this by fetching content from Contentful and then storing as NDJSON file in a format that Sanity can import.
 */
// https://cdn.contentful.com/spaces/{space_id}/environments/{environment_id}/entries?access_token=
const contentful = axios.create({
  baseURL: 'https://cdn.contentful.com/spaces/hoagspxz8z3s/environments/master',
  headers: {
    Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
  },
})

const fetchContent = async () => {
  const { data } = await contentful.get('/entries')
  return data
}

// markdown to portable text
const convertMarkdownToPortableText = (markdown: string) => {
  const html = marked.parse(markdown)

  const blocks = htmlToBlocks(html, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      // Special rule for code blocks
      {
        deserialize(element, next, block) {
          const el = element as HTMLElement

          // if it's an anchor we might need to rewrite local paths.
          if (el.tagName?.toLowerCase() === 'a') {
            const href = el.getAttribute('href')
            if (
              href &&
              !href.startsWith('http') &&
              !href.startsWith('/post') &&
              !href.startsWith('#')
            ) {
              // if href starts with / replace it with nothing.
              const text = (
                href.startsWith('/') ? href.substring(1) : href
              ).replace('/', '-')
              el.setAttribute('href', `/post/${text}`)
              return next(el)
            }
          }

          if (el.tagName?.toLowerCase() != 'pre') {
            return undefined
          }
          const code = el.children[0]
          if (!code) {
            return undefined
          }
          const language = code.getAttribute('class')?.replace('language-', '')
          console.log(language)
          const text = code.textContent
          // Return this as an own block (via block helper function), instead of appending it to a default block's children
          return block({
            _type: 'code',
            language: language,
            code: text,
          })
        },
      },
    ],
  })

  return blocks
}

const main = async () => {
  const content = await fetchContent()

  const redirects: {
    source: string
    destination: string
    permanent: boolean
  }[] = []

  const items = content.items
    .filter((item) => {
      return item.sys.contentType.sys.id === 'blogPost'
    })
    .map((item) => {
      if (item.fields.content) {
        const portableText = convertMarkdownToPortableText(item.fields.content)
        redirects.push({
          source: `/${item.fields.permalink}`,
          destination: `/post/${item.fields.permalink.replaceAll('/', '-')}`,
          permanent: true,
        })
        return {
          _type: 'post',
          _id: item.sys.id,
          _createdAt: item.sys.createdAt,
          _updatedAt: item.sys.updatedAt,
          title: item.fields.title,
          slug: {
            _type: 'slug',
            current: item.fields.permalink.replaceAll('/', '-'),
          },
          body: portableText,
        }
      }
      console.log(`No content for ${item.sys.id} - ${item.fields.title}`)
    })

  fs.writeFileSync(
    path.join(__dirname, 'content.ndjson'),
    items.map((item) => JSON.stringify(item)).join('\n'),
  )

  fs.writeFileSync(
    path.join(__dirname, 'redirects.json'),
    JSON.stringify(redirects),
  )
}

main()
