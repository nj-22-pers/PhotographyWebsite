"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "./ImageWrapper";

type Category = {
  _id: string;
  title: string;
  description?: string;
  slug?: { current?: string };
  photo?: {
    id?: string;
    url?: string;
    alt?: string;
    preview?: string;
  };
};

type SortOption = "original" | "title-asc" | "title-desc";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Original", value: "original" },
  { label: "Title A–Z", value: "title-asc" },
  { label: "Title Z–A", value: "title-desc" },
];

export default function PortfolioGrid({ categories }: { categories: Category[] }) {
  const [sort, setSort] = useState<SortOption>("original");

  const sortedCategories = useMemo(() => {
    const withIndex = categories.map((category, idx) => ({
      ...category,
      __index: idx,
    }));

    return withIndex
      .sort((a, b) => {
        if (sort === "original") return a.__index - b.__index;
        if (sort === "title-asc")
          return a.title.localeCompare(b.title, undefined, {
            sensitivity: "base",
          });
        return b.title.localeCompare(a.title, undefined, {
          sensitivity: "base",
        });
      })
      .map(({ __index, ...rest }) => rest);
  }, [categories, sort]);

  const cards = useMemo(
    () =>
      sortedCategories.map((category) => {
        const href = category.slug?.current ? `/${category.slug.current}` : "#";

        return (
          <Link
            key={category._id}
            href={href}
            className="group relative min-h-[440px] overflow-hidden rounded-2xl border border-white/5 bg-white/5 shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl md:min-h-[500px]"
          >
            {category.photo?.id ? (
              <Image
                id={category.photo.id}
                alt={category.photo.alt || `${category.title} cover photo`}
                preview={category.photo.preview}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                width={2200}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-semibold drop-shadow-lg">
                {category.title}
              </h3>
              {category.description && (
                <p className="mt-2 max-w-xl text-sm text-white/80 line-clamp-2 drop-shadow">
                  {category.description}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-all duration-300 group-hover:gap-3">
                View gallery
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        );
      }),
    [sortedCategories],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
          <span className="text-white/60">Order:</span>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSort(option.value)}
              className={`rounded-full px-3 py-1 transition ${
                sort === option.value
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {cards}
      </div>
    </div>
  );
}
