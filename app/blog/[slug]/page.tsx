import { notFound } from "next/navigation";
import BlogArticlePage from "@/app/components/blog/BlogArticlePage";
import { blogCopy } from "@/app/data/blog";

type BlogArticleRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogCopy.en.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogArticleRoute({
  params,
}: BlogArticleRouteProps) {
  const { slug } = await params;
  const exists = blogCopy.en.posts.some((post) => post.slug === slug);

  if (!exists) {
    notFound();
  }

  return <BlogArticlePage slug={slug} />;
}
