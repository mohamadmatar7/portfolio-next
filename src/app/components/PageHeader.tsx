"use client";

import React from "react";

type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;

  // optional tags/chips on the right
  tags?: string[];

  // optional extra right-side content (buttons, etc.)
  right?: React.ReactNode;

  // (optional): use h1 for case-study, keep h2 by default
  as?: "h1" | "h2";

  // (optional): allow case-study to use max-w-2xl, etc.
  subtitleClassName?: string;
};

export default function PageHeader({
  title,
  subtitle,
  tags = [],
  right,
  as = "h2",
  subtitleClassName,
}: PageHeaderProps) {
  const HeadingTag = as;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <HeadingTag
          className={
            as === "h1"
              ? "text-3xl font-semibold tracking-tight sm:text-4xl"
              : "text-2xl font-semibold tracking-tight sm:text-3xl"
          }
        >
          <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {title}
          </span>
        </HeadingTag>

        {subtitle ? (
          <p
            className={[
              "mt-2 text-neutral-300 leading-relaxed",
              subtitleClassName ?? "max-w-3xl",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {(tags.length > 0 || right) && (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-neutral-200"
            >
              {tag}
            </span>
          ))}
          {right}
        </div>
      )}
    </div>
  );
}
