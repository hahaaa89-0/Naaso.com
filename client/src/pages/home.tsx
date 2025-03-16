import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { BlogCard } from "@/components/blog-card";
import type { Product, BlogPost } from "@shared/schema";

export default function Home() {
  const { data: products } = useQuery<Product[]>({ 
    queryKey: ['/api/products']
  });

  const { data: posts } = useQuery<BlogPost[]>({ 
    queryKey: ['/api/posts']
  });

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1603718089842-da833e33c203')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-4">
            From Our Village<br />To Your Table
          </h1>
          <p className="text-xl mb-8 max-w-lg">
            Discover the authentic taste of organic products from our village farms
          </p>
          <Link href="/products">
            <Button size="lg" className="text-lg px-8">Shop Now</Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts?.slice(0, 2).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}