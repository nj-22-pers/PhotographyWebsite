import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import NavigationLinks from "./NavigationLinks";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORY_QUERY } from "@/sanity/lib/queries";

export default async function Footer() {
  const { data: categories } = await sanityFetch({ query: ALL_CATEGORY_QUERY });
  return (
    <footer className="bg-black py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Noah Judelson Photography logo"
                width={80}
                height={80}
                className="h-16 w-16 rounded-md object-contain shadow-lg sm:h-20 sm:w-20"
                priority
              />
              <div>
                <h4 className="text-2xl font-bold">Noah Judelson</h4>
                <p className="text-white/70">Photography</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              Astrophotography, landscape, motion, wildlife, real estate, and
              vertical wallpaper photography. Prints and licensing available.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <NavigationLinks
              type="main"
              className="space-y-2"
              linkClassName="text-white/80 hover:text-white text-base"
            />
          </div>

          {/* Photography Categories */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-lg font-semibold">Photography</h5>
            <div className="space-y-2">
              {categories?.map((cat) => (
                <div key={cat._id}>
                  <Link
                    href={`/${cat.slug?.current ?? ""}`}
                    className="text-white/80 hover:text-white text-base"
                  >
                    {cat.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-lg font-semibold">Contact</h5>
            <ul className="space-y-3 text-white/80">
              <li>
                <div className="text-sm uppercase tracking-wide text-white/50">
                  Email
                </div>
                <div className="text-base">judelsonnoah@gmail.com</div>
              </li>
              <li>
                <div className="text-sm uppercase tracking-wide text-white/50">
                  Phone
                </div>
                <div className="text-base">(508) 776-8473</div>
              </li>
              <li>
                <div className="text-sm uppercase tracking-wide text-white/50">
                  Locations
                </div>
                <div className="text-base">Boulder, CO</div>
                <div className="text-base">Cape Cod, MA</div>
              </li>
            </ul>
            <SocialLinks className="mt-3 flex gap-3" />
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center text-white/60">
          <p>&copy; 2025 Noah Judelson Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
