import { getAllCategories } from "@/services/CategoryService";
import { getAllProducts } from "@/services/ProductService";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["en", "ar"];

  // Fetch dynamic routes data
  const categories = await getAllCategories();
  const products = await getAllProducts();

  const dynamicCategoryPages = categories.map((category) => ({
    url: `/category/${category.id}`,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const dynamicProductPages = products.map((product) => ({
    url: `/product/${product.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const allPages = [...dynamicCategoryPages, ...dynamicProductPages];

  // Generate sitemap entries for each locale
  const sitemapEntries = locales.flatMap((locale) =>
    allPages.map((page) => ({
      url: `https://localhost:3001/${locale}${page.url}`,
      lastModified: new Date().toISOString(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  return sitemapEntries;
}
