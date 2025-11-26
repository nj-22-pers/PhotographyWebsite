import { components } from "@/sanity/portableTextComponents";
import { PortableText } from "next-sanity";
import { ABOUT_QUERYResult } from "@/sanity/types";
import Image from "./ImageWrapper";

export function About(props: NonNullable<ABOUT_QUERYResult>) {
  const { title, body, image } = props;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid min-h-[70vh] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Large portrait image */}
        {image?.id && image?.preview && (
          <div className="order-2 flex w-full justify-center lg:order-1 lg:col-span-7 lg:justify-self-center">
            <div className="relative mx-auto w-full max-w-4xl aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                id={image.id}
                alt={image.alt ? `${image.alt}` : "Professional Photographer"}
                preview={image.preview}
                hotspot={image.hotspot ?? undefined}
                crop={image.crop ?? undefined}
                mode="cover"
                className="h-full w-full object-cover object-center"
                width={2000}
                height={1400}
              />
            </div>
          </div>
        )}

        {/* Text content card */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-start">
          <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
            {title ? (
              <h1 className="mb-6 text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
                {title}
              </h1>
            ) : null}

            {body ? (
              <div className="prose lg:prose-lg prose-invert max-w-none">
                <PortableText value={body} components={components} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
