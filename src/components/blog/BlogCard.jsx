/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { formatDate } from "@/services/blogService";

export default function BlogCard({ post, showDate = false }) {
  return (
    <li>
      <Link href={`/blog/${post.slug}`} data-testid="blog-card" className="group block">
        <span className="relative block aspect-[3/2] w-full overflow-hidden rounded-[2px] bg-black/5">
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </span>

        {showDate && (
          <span className="mt-4 block font-nav text-[10px] tracking-[0.1em] text-[#1c1a17]/60">
            {formatDate(post.date)}
          </span>
        )}

        <span className={`block font-serif text-[20px] font-light leading-[1.3] text-[#111] sm:text-[22px] ${showDate ? "mt-2" : "mt-4"}`}>
          {post.title}
        </span>
      </Link>
    </li>
  );
}