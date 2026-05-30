import type { MetadataRoute } from "next";

const BASE_URL = "https://darhous-ai-cloud-academy.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          // Auth pages
          "/ar/login",
          "/en/login",
          "/ar/register",
          "/en/register",
          "/ar/forgot-password",
          "/en/forgot-password",
          "/ar/reset-password",
          "/en/reset-password",
          // Private pages
          "/ar/dashboard",
          "/en/dashboard",
          "/ar/profile",
          "/en/profile",
          "/ar/onboarding",
          "/en/onboarding",
          "/ar/admin",
          "/en/admin",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
