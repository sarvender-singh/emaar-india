/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import BlogCard from "./BlogCard";
import BlogToc, { ShareButtons } from "./BlogToc";
import { formatDate } from "@/services/blogService";

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const META = "font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6a6a6d]";
const BTN =
  "inline-flex h-[46px] items-center justify-center px-7 font-nav text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300";

function Blocks({ blocks }) {
  return blocks.map((b, i) =>
    b.ul ? (
      <ul key={i} className="m-0 mt-5 list-disc space-y-3 pl-5">
        {b.ul.map((li, j) => (
          <li key={j}>
            <strong className="font-semibold text-[#111]">{li.b}</strong> {li.t}
          </li>
        ))}
      </ul>
    ) : (
      <p key={i} className="m-0 mt-5 first:mt-0">{b.p}</p>
    )
  );
}

export default function BlogArticle({ post, older, newer, more }) {
  const sections = (post.sections ?? []).map((s) => ({ ...s, id: slugify(s.heading) }));
  const toc = sections.map((s) => ({ id: s.id, title: s.heading }));
  const hasToc = toc.length > 0;

  return (
    <article data-testid="blog-article" className="text-[#1c1a17]">
      {/* Header */}
      <header className="px-[clamp(20px,4vw,64px)] pb-10 pt-8 sm:pt-10 lg:px-[max(5vw,32px)]">
        <nav aria-label="Breadcrumb">
          <ol className={`${META} m-0 flex list-none flex-wrap items-center gap-[10px] p-0 leading-[1.5] tracking-[0.2em]`}>
            <li className="flex items-center gap-[10px]">
              <Link href="/" className="text-[#6f6553] hover:text-[#111]">Home</Link>
              <span aria-hidden="true" className="opacity-50">/</span>
            </li>
            <li className="flex items-center gap-[10px]">
              <Link href="/about-emaar" className="text-[#6f6553] hover:text-[#111]">About Emaar</Link>
              <span aria-hidden="true" className="opacity-50">/</span>
            </li>
            <li className="flex items-center gap-[10px]">
              <Link href="/blog" className="text-[#6f6553] hover:text-[#111]">Emaar Blogs</Link>
              <span aria-hidden="true" className="opacity-50">/</span>
            </li>
            <li aria-current="page" className="max-w-[220px] truncate sm:max-w-[320px]">{post.title}</li>
          </ol>
        </nav>

        <div className="mx-auto mt-10 flex max-w-[900px] flex-col items-center text-center sm:mt-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-nav text-[10px] font-bold uppercase tracking-[0.2em] text-[#111] hover:opacity-60"
          >
            <svg viewBox="0 0 14 12" fill="none" aria-hidden="true" className="h-3 w-3.5">
              <path d="M13 6H1m5-5L1 6l5 5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            All stories
          </Link>

          <h1 className="mb-0 mt-6 font-serif text-[32px] font-light leading-[1.1] text-[#111] sm:text-[52px]">
            {post.title}
          </h1>
          <p className="mb-0 mt-5 max-w-[700px] text-[15px] leading-[1.7] text-[#5c5346] sm:text-[17px]">
            {post.excerpt}
          </p>
          <p className="mb-0 mt-5 text-[11px] text-[#1c1a17]/60">
            {formatDate(post.date)}
            {post.readTime && <span className="mx-2">·</span>}
            {post.readTime}
          </p>
        </div>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[2px] bg-black/5 lg:aspect-[21/9]">
          <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </header>

      {/* Body */}
      <div className="px-[clamp(20px,4vw,64px)] lg:px-[max(5vw,32px)]">
        <div
          className={`grid grid-cols-[minmax(0,1fr)] gap-10 ${
            hasToc ? "lg:grid-cols-[220px_minmax(0,720px)] lg:gap-[5vw]" : "lg:mx-auto lg:max-w-[720px]"
          }`}
        >
          {hasToc && <BlogToc label="On this page" items={toc} title={post.title} />}

          <div className="min-w-0 text-[15px] leading-[1.9] text-[#5c5346] sm:text-[16px]">
            {post.intro?.map((p, i) => (
              <p key={i} className="m-0 mt-5 first:mt-0">{p}</p>
            ))}

            {sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-[calc(var(--hdr-h)+24px)]">
                <h2 className="m-0 mb-5 font-serif text-[26px] font-light leading-[1.15] text-[#111] sm:text-[34px]">
                  {s.heading}
                </h2>
                <Blocks blocks={s.blocks} />
              </section>
            ))}

            <div className="mt-12 flex justify-center">
              <Link href="/contact" className={`${BTN} border border-[#111] bg-[#111] text-white hover:bg-transparent hover:text-[#111]`}>
                Talk to our property advisor
              </Link>
            </div>

            {/* Share (mobile, since the sidebar is hidden) */}
            <div className="mt-10 lg:hidden">
              <ShareButtons title={post.title} />
            </div>

            {/* Newer / older */}
            {(older || newer) && (
              <nav
                aria-label="More stories"
                className="mt-14 grid grid-cols-1 gap-6 border-t border-[#11111124] pt-6 sm:grid-cols-2"
              >
                {newer ? (
                  <Link href={`/blog/${newer.slug}`} className="group block">
                    <span className={META}>Newer story</span>
                    <span className="mt-2 block font-serif text-[20px] font-light leading-[1.3] text-[#111] group-hover:opacity-60">
                      {newer.title}
                    </span>
                  </Link>
                ) : <span />}
                {older && (
                  <Link href={`/blog/${older.slug}`} className="group block sm:text-right">
                    <span className={META}>Older story</span>
                    <span className="mt-2 block font-serif text-[20px] font-light leading-[1.3] text-[#111] group-hover:opacity-60">
                      {older.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* More stories (uses the shared BlogCard) */}
      {more.length > 0 && (
        <section
          data-testid="blog-more"
          className="mt-16 border-t border-[#11111124] px-[clamp(20px,4vw,64px)] pb-40 pt-14 sm:mt-20 sm:pb-24 sm:pt-20 lg:px-[max(5vw,32px)]"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className={`${META} m-0`}>Keep reading</p>
              <h2 className="mb-0 mt-3 font-serif text-[28px] font-light leading-[1.15] text-[#111] sm:text-[36px]">
                More stories
              </h2>
            </div>
            <Link
              href="/blog"
              className={`${BTN} shrink-0 border border-[#111] text-[#111] hover:bg-[#111] hover:text-white`}
            >
              All stories
            </Link>
          </div>

          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <BlogCard key={p.slug} post={p} showDate />
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}