import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import BackBtn from "../common/back-btn";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <FileQuestion className="mx-auto h-16 w-16 text-blue-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <div className="space-y-4">
          <BackBtn />
          <Button asChild variant="outline" className="w-full">
            <Link href="/en/about">Learn About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
