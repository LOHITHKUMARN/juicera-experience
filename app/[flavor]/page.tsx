import React from "react";
import ProductPageClient from "@/components/ProductPageClient";
import { products } from "@/data/products";

// Required for Next.js static exports (output: 'export')
// This tells Next.js at build time which paths to pre-render.
export function generateStaticParams() {
  return products.map((product) => ({
    flavor: product.id,
  }));
}

export default async function ProductPage({ params }: { params: { flavor: string } }) {
  // In modern Next.js, params is an async Promise and must be awaited.
  const { flavor } = await params;

  return <ProductPageClient flavor={flavor} />;
}
