import { Link } from "wouter";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">Naaso</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products">
              <span className="hover:text-primary">{t('nav.products')}</span>
            </Link>
            <Link href="/blog">
              <span className="hover:text-primary">{t('nav.blog')}</span>
            </Link>
            <Link href="/about">
              <span className="hover:text-primary">{t('nav.about')}</span>
            </Link>
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                className={language === 'en' ? 'text-primary' : ''}
                onClick={() => setLanguage('en')}
              >
                EN
              </Button>
              <span className="text-muted-foreground">/</span>
              <Button
                variant="ghost"
                size="sm"
                className={language === 'np' ? 'text-primary' : ''}
                onClick={() => setLanguage('np')}
              >
                नेपाली
              </Button>
            </div>
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
                    {cart.items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ${(item.product.price / 100).toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => cart.removeItem(item.product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total:</span>
                        <span>${(cart.total() / 100).toFixed(2)}</span>
                      </div>
                      <Button className="w-full">Checkout</Button>
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
                  <Link href="/products">{t('nav.products')}</Link>
                  <Link href="/blog">{t('nav.blog')}</Link>
                  <Link href="/about">{t('nav.about')}</Link>
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
    </div>
  );
}