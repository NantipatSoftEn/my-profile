import { useEffect, useRef, useState } from 'react'

const navLinks = [
  {
    url: '#whoami',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
      </svg>
    ),
    text: 'Who am i?',
  },
  {
    url: '#projects',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z" />
      </svg>
    ),
    text: 'Projects',
  },
  {
    url: '#blog',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z" />
        <path d="M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z" />
      </svg>
    ),
    text: 'Blog',
  },
  {
    url: '#contact',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M20.563 3.34a1.002 1.002 0 0 0-.989-.079l-17 8a1 1 0 0 0 .026 1.821L8 15.445v6.722l5.836-4.168 4.764 2.084a1 1 0 0 0 1.399-.85l1-15a1.005 1.005 0 0 0-.436-.893zm-2.466 14.34-5.269-2.306L16 9.167l-7.649 4.25-2.932-1.283 13.471-6.34-.793 11.886z" />
      </svg>
    ),
    text: 'Contact',
  },
]
const BottomNarbar: React.FC = () => {
  const mainRef = useRef(null)

  return (
    <header className="md:flex">
      <div
        ref={mainRef}
        className={`main-nav lower-glassmorphism bg-bglight dark:bg-bgdark duration-400 fixed top-0 z-30 h-16 w-full px-4 shadow-sm sm:px-8`}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between">
          <nav className="flex items-center">
            <div className="glassmorphism md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none md:static md:left-auto md:transform-none bg-bglight dark:bg-carddark dark:text-textlight md:drop-shadow-none fixed bottom-4 left-1/2 z-30 w-11/12 -translate-x-1/2 transform rounded drop-shadow-lg">
              <ul className="flex items-center justify-evenly py-1">
                {navLinks.map(navLink => (
                  <li key={navLink.url}>
                    <a
                      href={navLink.url}
                      className={`md:text-lg md:w-auto dark:fill-textlight md:mr-6 md:hover:text-marrsgreen md:dark:hover:text-carrigreen link-outline flex w-[4.5rem] flex-col items-center text-sm`}
                    >
                      <span className="md:hidden">{navLink.svg}</span>
                      <span className="whitespace-nowrap">{navLink.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default BottomNarbar
