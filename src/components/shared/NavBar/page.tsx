import Link from "next/link";

export default function NavBar() {
  const navLinks = [
    { title: "About", path: "/about" },
    { title: "Add Book", path: "/addBook" },
  ];
  return (
    <div className="navbar py-7">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path} className="text-black">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-lg md:text-xl lg:text-2xl">
          Book Rental Service
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-5 px-1">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.path} className="text-white btn btn-outline">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/login" className="btn btn-outline text-white">Login</Link>
      </div>
    </div>
  );
}
