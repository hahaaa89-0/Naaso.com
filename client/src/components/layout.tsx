import { Link } from "wouter";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartItem } from "@/components/cart-item";
import { loadStripe } from "@stripe/stripe-js";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Layout({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      const response = await apiRequest("POST", "/api/create-checkout-session", {
        items: cart.items.map(item => ({
          id: item.product.id,
          quantity: item.quantity,
        }))
      });
      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">Naaso</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                      {cart.items.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
                {cart.items.length === 0 ? (
                  <p className="text-muted-foreground">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-[60vh] overflow-auto">
                      {cart.items.map((item) => (
                        <CartItem
                          key={item.product.id}
                          product={item.product}
                          quantity={item.quantity}
                          onUpdateQuantity={(quantity) => 
                            cart.updateQuantity(item.product.id, quantity)
                          }
                          onRemove={() => cart.removeItem(item.product.id)}
                        />
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total:</span>
                        <span>${(cart.total() / 100).toFixed(2)}</span>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleCheckout}
                        disabled={cart.items.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>

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
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="w-6 h-6 text-primary hover:text-primary/80" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-6 h-6 text-primary hover:text-primary/80" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="w-6 h-6 text-primary hover:text-primary/80" />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © 2025 Naaso. All rights reserved.
          </div>
        </div>
      </footer>
      <WhatsAppButton phoneNumber="1234567890" />
    </div>
  );
}