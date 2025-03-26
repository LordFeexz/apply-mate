import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Apply Mate",
    short_name: "Apply Mate",
    description: "Your job search mate",
    start_url: "/",
    display: "browser",
  };
}
