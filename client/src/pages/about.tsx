export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Naaso</h1>
        
        <div className="prose prose-green max-w-none">
          <p className="lead">
            Welcome to Naaso, where we bring the authentic taste of village-grown organic products directly to your table.
          </p>

          <img
            src="https://images.unsplash.com/photo-1694100610707-8e3ffdcb18f1"
            alt="Our Farm"
            className="w-full rounded-lg my-8"
          />

          <h2>Our Story</h2>
          <p>
            Nestled in the heart of the mountains, our village has been practicing traditional farming methods for generations. 
            We take pride in our organic farming practices that respect both nature and tradition.
          </p>

          <h2>Our Products</h2>
          <p>
            From pure mountain honey to crisp apples and nutritious sattu, every product we offer is carefully harvested 
            and prepared to maintain its natural goodness. We believe in sustainable farming practices that protect our 
            environment while providing you with the healthiest options for your family.
          </p>

          <h2>Our Commitment</h2>
          <p>
            Quality and authenticity are at the heart of everything we do. We're committed to:
          </p>
          <ul>
            <li>100% organic farming practices</li>
            <li>Supporting local village farmers</li>
            <li>Sustainable packaging</li>
            <li>Maintaining traditional processing methods</li>
          </ul>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold mb-2">Visit Our Farm</h3>
            <p>
              We welcome visitors to experience our farming practices firsthand. 
              Contact us to arrange a visit and see where your food comes from.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
