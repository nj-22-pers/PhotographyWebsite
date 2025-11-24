/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import NavigationLinks from "./NavigationLinks";
import SocialLinks from "./SocialLinks";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-2 pt-3 sm:px-4 md:px-6">
      <div className="flex w-full flex-col gap-3 rounded-2xl bg-black/80 px-3 py-3 backdrop-blur md:flex-row md:items-center md:justify-between md:gap-8 md:rounded-none md:bg-transparent md:px-0 md:py-1 md:backdrop-blur-none">
        {/* Brand */}
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <img
              src="/logo.png"
              alt="Noah Judelson Photography logo"
              className="h-12 w-12 rounded-md object-contain shadow-md sm:h-14 sm:w-14"
            />
            <div className="leading-tight">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg sm:text-4xl md:text-4xl">
                Noah Judelson
              </h2>
              <p className="text-sm text-gray-100 drop-shadow-md sm:text-base">
                Photography
              </p>
            </div>
          </div>
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="ml-4 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 p-2 text-white shadow-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1">
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
            </div>
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <NavigationLinks
            type="main"
            className="flex flex-wrap justify-center gap-4"
            linkClassName="text-white hover:text-gray-300 font-medium transition-colors duration-200 drop-shadow-md text-lg"
            layout="flex"
          />
          <SocialLinks
            className="flex gap-4"
            iconSize="w-6 h-6"
            linkClassName="text-white hover:text-gray-300 transition-colors duration-200 drop-shadow-md"
          />
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-black/85 px-4 py-4 shadow-2xl md:hidden">
            <NavigationLinks
              type="main"
              className="flex flex-col gap-2 text-left"
              linkClassName="block w-full rounded-lg px-3 py-2 text-white hover:bg-white/10 font-medium"
              layout="flex"
            />
          </div>
        )}
      </div>
    </header>
  );
}
