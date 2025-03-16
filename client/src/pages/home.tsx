import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { BlogCard } from "@/components/blog-card";
import { ImageSlider } from "@/components/image-slider";
import { VideoPlayer } from "@/components/video-player";
import type { Product, BlogPost } from "@shared/schema";

const farmImages = [
  {
    src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
    alt: "Organic Farm Field",
  },
  {
    src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
    alt: "Fresh Produce",
  },
  {
    src: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0",
    alt: "Honey Production",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Customer",
    content: "The organic honey from Naaso is the best I've ever tasted. Pure and natural!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
  {
    name: "Michael Chen",
    role: "Food Blogger",
    content: "Their commitment to traditional farming methods really shows in the quality of their products.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
  {
    name: "Priya Sharma",
    role: "Health Coach",
    content: "I recommend Naaso's products to all my clients. The sattu is exceptionally nutritious.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
];

export default function Home() {
  const { data: products } = useQuery<Product[]>({ 
    queryKey: ['/api/products']
  });

  const { data: posts } = useQuery<BlogPost[]>({ 
    queryKey: ['/api/posts']
  });

  return (
    <div>
      {/* Hero Section with Image Slider */}
      <section className="relative">
        <ImageSlider images={farmImages} />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container mx-auto px-4 text-white">
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
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Watch how we maintain traditional farming practices while bringing
                you the finest organic products from our village.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <VideoPlayer src="https://example.com/farm-video.mp4" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <Button variant="outline" size="lg">View All Products</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog">
              <Button variant="outline" size="lg">Read More Posts</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}