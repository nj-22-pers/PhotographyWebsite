import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { EmptyContent } from "@/components/MissingPage";
import PortfolioGrid from "@/components/PortfolioGrid";

export default async function PortfolioPage() {
  const { data: categories } = await sanityFetch({ query: ALL_CATEGORY_QUERY });

  if (!categories || categories.length === 0) {
    return (
      <EmptyContent
        contentType="Photo Categories"
        createHref="/studio/structure/category"
      />
    );
  }

  return (
    <div className="bg-black text-white">
      <div className="px-4 pt-32 pb-16 md:px-8">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Explore the full collection
          </h1>
          <p className="max-w-2xl text-white/70">
            Explore my full photography portfolio in high quality. View each
            collection in the layout that works best for you.
          </p>
        </div>

        <PortfolioGrid categories={categories} />
      </div>
    </div>
  );
}
