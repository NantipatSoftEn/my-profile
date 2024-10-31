import { navLinks } from '../constant/navLink'
const BottomNarbar: React.FC = () => {
  return (
    <div className="md:flex">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between">
        <nav className="flex items-center">
          <div className="glassmorphism md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none md:static md:left-auto md:transform-none dark:bg-carddark dark:text-textlight md:drop-shadow-none fixed bottom-4 left-1/2 z-30 w-11/12 -translate-x-1/2 transform rounded bg-slate-50/50 drop-shadow-lg">
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
  )
}

export default BottomNarbar
