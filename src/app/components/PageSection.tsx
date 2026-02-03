"use client";

import React from "react";

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageSection({
  children,
  className = "",
}: PageSectionProps) {
  return (
    <section className={`relative pt-8 pb-10 space-y-10 ${className}`}>
      {children}
    </section>
  );
}
