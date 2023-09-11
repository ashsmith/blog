import Link from 'next/link'
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiStrava,
  SiTwitter,
} from 'react-icons/si'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="max-w-4xl m-auto mt-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="place-self-start">
            <ul>
              <li className="inline-block px-2">
                <Link href="/">Home</Link>
              </li>
              {/* <li className="inline-block px-2"><Link href="/">About</Link></li> */}
              {/* <li className="inline-block px-2"><Link href="/">Blog</Link></li> */}
            </ul>
          </div>
          <div className="place-self-end">
            <ol>
              <li className="inline-block px-2">
                <a
                  href="https://twitter.com/ashsmithco"
                  rel="nofollow noopener"
                >
                  <SiTwitter title="Follow me on Twitter" />
                </a>
              </li>
              <li className="inline-block px-2">
                <a
                  href="https://www.strava.com/athletes/5154252"
                  rel="nofollow noopener"
                >
                  <SiStrava title="Follow me on Strava" />
                </a>
              </li>
              <li className="inline-block px-2">
                <a href="https://github.com/ashsmith" rel="nofollow noopener">
                  <SiGithub title="Follw me on GitHub" />
                </a>
              </li>
              <li className="inline-block px-2">
                <a
                  href="https://instagram.com/ashsmith____"
                  rel="nofollow noopener"
                >
                  <SiInstagram title="Follow me on Instagram" />
                </a>
              </li>
              <li className="inline-block px-2">
                <a
                  href="https://www.linkedin.com/in/ashsmithco/"
                  rel="nofollow noopener"
                >
                  <SiLinkedin title="Connect with me on LinkedIn" />
                </a>
              </li>
            </ol>
          </div>
        </div>
        <div className="max-w-xl m-auto flex justify-center mb-8">
          {/* <Image src={profilePic} alt="Picture of the author" className="rounded-full" width={95} height={95} placeholder="blur" /> */}
          <div className="flex flex-col items-center ml-8">
            <h1 className="text-5xl font-extrabold">Ash Smith</h1>
            <h2 className="text-xl">Cloud & Serverless Developer</h2>
          </div>
        </div>
      </div>
      <main>{children}</main>
      <footer className="footer">
        <p className="footer__text">
          Made with{' '}
          <svg
            datasanity-icon="heart-filled"
            width="1em"
            height="1em"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
            ></path>
          </svg>{' '}
        </p>
      </footer>
    </div>
  )
}
