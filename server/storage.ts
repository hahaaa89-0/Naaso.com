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
