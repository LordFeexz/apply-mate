import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Apply Mate | Your job search mate",
    short_name: "Apply Mate",
    description: "Help you to find the your ideal job",
    start_url: "/",
    display: "browser",
    categories: ["productivity", "recruitment", "job-search"],
  };
}
