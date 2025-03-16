import { type BlogPost } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Link } from "wouter";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card>
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
          <span>•</span>
          <span className="capitalize">{post.type}</span>
        </div>
        <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {post.content.length > 150
            ? `${post.content.slice(0, 150)}...`
            : post.content}
        </p>
        <Link href={`/blog/${post.id}`}>
          <Button variant="outline" size="sm">Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
}