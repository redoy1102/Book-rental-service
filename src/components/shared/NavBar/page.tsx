"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

export default function NavBar() {
  const navLinks = [
    { title: "About", path: "/about" },
    { title: "Add Book", path: "/addBook" },
    { title: "Courses", path: "https://code-with-redoy.web.app/" },
  ];

  const { user, signInWithGoogle, logout } = useAuth();
  console.log(user);
  console.log(user?.displayName);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Google LogIn
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Logout
  const handleGoogleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Google logout failed.", error);
    }
  };

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
        {user ? (
          <div className="dropdown dropdown-end text-black">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full">
                <Image
                  alt="Image"
                  src={user?.photoURL}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  {user.displayName}
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleGoogleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline text-white"
          >
            <FcGoogle className="text-2xl" />
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}
