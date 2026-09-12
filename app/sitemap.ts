import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

// All seven public routes.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/clubs", priority: 0.9, changeFrequency: "monthly" },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" },
    { path: "/getting-started", priority: 0.8, changeFrequency: "yearly" },
    { path: "/resources", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
