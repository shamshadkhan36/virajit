import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const adminMode = searchParams.get("admin") === "true";

    const where: any = {};
    if (!adminMode) {
      where.isPublished = true;
    }
    if (category && category !== "All") {
      where.category = category;
    }

    const blogs = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ success: true, blogs });
  } catch (error: any) {
    console.error("Blogs list error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      coverImage,
      category,
      author,
      readTime,
      isPublished,
      blocks,
    } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required." },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        slug: generatedSlug,
        excerpt: excerpt || "A comprehensive tech guide for refurbished devices.",
        coverImage:
          coverImage ||
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
        category: category || "Buying Guides",
        author: author || "Editorial Team",
        readTime: readTime || "5 min read",
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        blocks: typeof blocks === "string" ? blocks : JSON.stringify(blocks || []),
      },
    });

    return NextResponse.json({ success: true, blogPost });
  } catch (error: any) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
