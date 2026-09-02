import { products, getProductBySlug } from "../../data/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductAddToCartButton from "./ProductAddToCartButton";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <Link href="/" className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors mb-12 font-label-caps">
          <span className="material-icons-outlined text-sm mr-2">arrow_back</span>
          Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Image Gallery Column */}
          <div className="relative h-[60vh] md:h-[80vh] w-full rounded-2xl overflow-hidden bg-surface-container-low shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Product Details Column */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="font-headline-lg text-headline-lg md:text-5xl text-primary mb-4">{product.name}</h1>
              <p className="font-headline-sm text-2xl text-secondary">${product.price}</p>
            </div>
            
            <p className="font-body-lg text-on-surface-variant leading-relaxed mb-8">
              {product.longDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-12 py-8 border-y border-outline-variant/30">
              <div>
                <span className="block font-label-caps text-on-surface-variant mb-1">Origin</span>
                <span className="font-body-md text-primary">{product.origin}</span>
              </div>
              <div>
                <span className="block font-label-caps text-on-surface-variant mb-1">Altitude</span>
                <span className="font-body-md text-primary">{product.altitude}</span>
              </div>
              <div>
                <span className="block font-label-caps text-on-surface-variant mb-1">Process</span>
                <span className="font-body-md text-primary">{product.process}</span>
              </div>
              <div>
                <span className="block font-label-caps text-on-surface-variant mb-1">Roast Level</span>
                <span className="font-body-md text-primary">{product.roastLevel}</span>
              </div>
            </div>
            
            <div className="mb-12">
              <span className="block font-label-caps text-on-surface-variant mb-4">Tasting Notes</span>
              <div className="flex flex-wrap gap-3">
                {product.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-secondary/10 text-secondary font-label-caps rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <ProductAddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
