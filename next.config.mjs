import redirects from './redirects.json' assert { 'type': 'json' }
/** @type {import('next').NextConfig} */
const config = {
  images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
  redirects: async () => {
    return redirects
  },
}

export default config
