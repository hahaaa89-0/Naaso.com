import { Link } from "wouter";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">Naaso</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/products">
              <span className="hover:text-primary">Products</span>
            </Link>
            <Link href="/blog">
              <span className="hover:text-primary">Blog</span>
            </Link>
            <Link href="/about">
              <span className="hover:text-primary">About</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/products">Products</Link>
                  <Link href="/blog">Blog</Link>
                  <Link href="/about">About</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Naaso</h3>
              <p className="text-sm text-muted-foreground">
                Bringing organic goodness from our village to your home.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Email: contact@naaso.com<br />
                Phone: +1 234 567 890
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Add social media links here */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
