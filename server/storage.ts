import { products, blogPosts, type Product, type BlogPost, type InsertProduct, type InsertBlogPost } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private productId: number;
  private blogPostId: number;

  constructor() {
    this.products = new Map();
    this.blogPosts = new Map();
    this.productId = 1;
    this.blogPostId = 1;

    // Add some initial products
    this.initializeProducts();
    this.initializeBlogPosts();
  }

  private initializeProducts() {
    const initialProducts: InsertProduct[] = [
      {
        name: "Organic Mountain Honey",
        description: "Pure honey harvested from mountain flowers",
        price: 1500, // $15.00
        image: "https://images.unsplash.com/photo-1570723771257-ee5d32fd4d34",
        category: "honey",
        inStock: true,
      },
      {
        name: "Fresh Himalayan Apples",
        description: "Crisp and sweet apples from our orchards",
        price: 800,
        image: "https://images.unsplash.com/photo-1476837579993-f1d3948f17c2",
        category: "fruits",
        inStock: true,
      },
      {
        name: "Traditional Sattu",
        description: "Nutritious roasted gram flour",
        price: 1000,
        image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
        category: "grains",
        inStock: true,
      },
    ];

    initialProducts.forEach(product => this.createProduct(product));
  }

  private initializeBlogPosts() {
    const initialPosts: InsertBlogPost[] = [
      {
        title: "Spring Honey Harvest Season Begins",
        content: "As the mountain flowers bloom, our beekeepers prepare for the spring honey harvest. This season promises to be exceptional with the abundance of wildflowers in our region. Learn about our traditional beekeeping methods and what makes our mountain honey special.",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
        type: "blog",
      },
      {
        title: "Sustainable Farming Update",
        content: "This month, we've implemented new sustainable farming practices in our apple orchards. By using natural pest control methods and organic fertilizers, we're ensuring our apples remain pesticide-free while maintaining their crisp, sweet taste.",
        image: "https://images.unsplash.com/photo-1589927986089-35812ab65dde",
        type: "update",
      },
      {
        title: "Traditional Sattu Making Process",
        content: "Discover the ancient art of making Sattu, a nutritious flour that's been a staple of our village for generations. We'll take you through our traditional roasting process and explain why our method produces the most flavorful and nutritious Sattu.",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df",
        type: "blog",
      }
    ];

    initialPosts.forEach(post => this.createBlogPost(post));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const newPost: BlogPost = {
      ...post,
      id,
      createdAt: new Date(),
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }
}

export const storage = new MemStorage();