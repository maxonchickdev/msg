"use client";

import Link from "@mui/material/Link";

export default function NotFoundPage() {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center">
      <p className="text-4xl font-bold">Page not found</p>
      <Link href="/">Come back</Link>
    </div>
  );
}
