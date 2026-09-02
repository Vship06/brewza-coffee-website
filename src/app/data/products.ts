export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  origin: string;
  altitude: string;
  process: string;
  roastLevel: "Light" | "Medium" | "Dark";
}

export const products: Product[] = [
  {
    id: "ethiopia-1",
    slug: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    price: 24,
    image: "/roasts/roast-2.jpg",
    shortDescription: "A delicate, floral profile with bright acidity. Sourced from high-altitude farms for unparalleled clarity.",
    longDescription: "Grown in the legendary Yirgacheffe region of Ethiopia, this coffee is a quintessential example of what makes East African coffees so prized. Cultivated at elevations over 2,000 meters, the beans mature slowly, developing complex floral aromas and a sparkling, tea-like acidity. Expect vibrant notes of jasmine, bergamot, and a sweet honeysuckle finish.",
    tags: ["Jasmine", "Bergamot"],
    origin: "Yirgacheffe, Ethiopia",
    altitude: "2,000m - 2,200m",
    process: "Washed",
    roastLevel: "Light"
  },
  {
    id: "guatemala-1",
    slug: "guatemala-antigua",
    name: "Guatemala Antigua",
    price: 22,
    image: "/roasts/roast-1.jpg",
    shortDescription: "Rich, full-bodied, and deeply satisfying. Roasted to highlight its natural sweetness and complex cocoa notes.",
    longDescription: "Nestled between three volcanoes, the Antigua valley provides volcanic pumice soil that is rich in minerals. This environment creates a coffee that is celebrated for its complex flavor profile and velvety body. Our roast brings out a deep, dark cocoa sweetness, perfectly balanced with subtle hints of roasted pecan and a mild, apple-like acidity.",
    tags: ["Dark Cocoa", "Pecan"],
    origin: "Antigua, Guatemala",
    altitude: "1,500m - 1,700m",
    process: "Washed",
    roastLevel: "Medium"
  },
  {
    id: "kenya-1",
    slug: "kenya-aa-reserve",
    name: "Kenya AA Reserve",
    price: 28,
    image: "/roasts/roast-3.jpg",
    shortDescription: "Vibrant and juicy with a syrupy mouthfeel. A bold expression of East African terroir with intense berry notes.",
    longDescription: "The 'AA' grade denotes the largest, most flavor-dense beans from the Kenyan harvest. Grown on the slopes of Mount Kenya, this reserve lot is characterized by its intense, wine-like acidity and profound dark berry notes. It is a bold, complex cup with a syrupy mouthfeel that lingers long after the final sip, featuring prominent notes of blackberry and blackcurrant.",
    tags: ["Blackberry", "Wine"],
    origin: "Nyeri, Kenya",
    altitude: "1,700m - 1,900m",
    process: "Fully Washed",
    roastLevel: "Medium"
  },
  {
    id: "colombia-1",
    slug: "colombia-supremo",
    name: "Colombia Supremo",
    price: 20,
    image: "/roasts/roast-4.jpg",
    shortDescription: "Smooth and perfectly balanced. Features notes of caramel, toasted nuts, and mild citrus.",
    longDescription: "The Supremo grade guarantees the largest and highest quality beans from the Colombian harvest. Grown in the volcanic soils of the Andes mountains, this coffee presents a classic, comforting profile. It boasts a syrupy sweet body with rich notes of golden caramel, a hint of toasted almonds, and a very mild, pleasant citrus finish.",
    tags: ["Caramel", "Almond"],
    origin: "Huila, Colombia",
    altitude: "1,400m - 1,800m",
    process: "Washed",
    roastLevel: "Medium"
  },
  {
    id: "sumatra-1",
    slug: "sumatra-mandheling",
    name: "Sumatra Mandheling",
    price: 25,
    image: "/roasts/roast-5.jpg",
    shortDescription: "A deep, earthy, and immensely full-bodied cup. Dark roasted to perfection for a powerful morning kick.",
    longDescription: "Grown near Lake Toba on the island of Sumatra, this coffee undergoes the unique 'Giling Basah' (wet-hulling) process. This traditional method imparts an unmistakable earthy, rich, and heavily textured body. Roasted dark to emphasize its savory characteristics, you'll discover complex notes of dark chocolate, cedar, and a lingering, sweet herbaceous finish.",
    tags: ["Earth", "Dark Chocolate"],
    origin: "Sumatra, Indonesia",
    altitude: "900m - 1,600m",
    process: "Wet-Hulled",
    roastLevel: "Dark"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
