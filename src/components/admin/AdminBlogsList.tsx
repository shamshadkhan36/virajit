"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Layers,
} from "lucide-react";

interface AdminBlogsListProps {
  onEditPost: (post: BlogPost) => void;
  onCreateNew: () => void;
}

export const AdminBlogsList: React.FC<AdminBlogsListProps> = ({
  onEditPost,
  onCreateNew,
}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs?admin=true");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error("Error loading blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post and its page builder layout?")) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      await loadBlogs();
    } catch (err) {
      console.error("Delete blog error:", err);
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-600" />
            Visual Page Builder Articles & Guides
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Create rich, block-structured guides with embedded live refurbished laptop recommendations.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-brand-600/20"
        >
          <Plus className="w-4 h-4" />
          Create New Article with Page Builder
        </button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center text-xs text-slate-400 bg-white rounded-3xl border border-cream-300">
            No blog posts created yet. Click above to launch the Visual Page Builder!
          </div>
        ) : (
          blogs.map((post) => {
            let blockCount = 0;
            try {
              blockCount = JSON.parse(post.blocks).length;
            } catch {
              blockCount = 0;
            }

            return (
              <div
                key={post.id}
                className="group flex flex-col bg-white rounded-3xl border border-cream-300 hover:border-brand-600 transition-all overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className="relative h-44 w-full bg-cream-200">
                  <Image
                    src={post.coverImage || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-black text-brand-700 shadow-sm">
                      {post.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-brand-50 text-[10px] font-bold text-brand-700 border border-brand-200 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {blockCount} Blocks
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-slate-500">
                      By {post.author} • {post.readTime}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-slate-700 transition-colors shadow-sm"
                        title="View Public Post"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => onEditPost(post)}
                        className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs flex items-center gap-1 transition-colors border border-brand-200"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit in Builder
                      </button>

                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
