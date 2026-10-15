import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slugOrId = params.slug;

    const blog = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug: slugOrId }, { id: slugOrId }],
      },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("Get blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const id = params.slug;
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

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        coverImage,
        category,
        author,
        readTime,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : undefined,
        blocks: typeof blocks === "string" ? blocks : blocks ? JSON.stringify(blocks) : undefined,
      },
    });

    return NextResponse.json({ success: true, blog: updated });
  } catch (error: any) {
    console.error("Update blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const id = params.slug;
    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully.",
    });
  } catch (error: any) {
    console.error("Delete blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
