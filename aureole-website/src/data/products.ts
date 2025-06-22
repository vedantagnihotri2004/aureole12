// Product data schema
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  stock: number;
  isBestSeller?: boolean;
  isNew?: boolean;
}

// Placeholder image for products
const placeholderImage = "https://placehold.co/600x400/e9d9c8/333333?text=Auréole+Candle";

// Sample product data
export const products: Product[] = [
  {
    id: 1,
    name: "Vanilla & Cedar",
    description: "A warm and comforting blend of vanilla bean and cedar wood, perfect for creating a cozy atmosphere in living rooms and bedrooms.",
    price: 35,
    image: placeholderImage,
    category: "Classic Collection",
    tags: ["warm", "cozy", "vanilla", "cedar"],
    rating: 4.8,
    stock: 25,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Amber & Moss",
    description: "A sophisticated blend of rich amber and earthy moss that evokes the feeling of a walk through a lush forest after rainfall.",
    price: 42,
    image: placeholderImage,
    category: "Classic Collection",
    tags: ["earthy", "sophisticated", "amber", "moss"],
    rating: 4.9,
    stock: 18,
    isBestSeller: true
  },
  {
    id: 3,
    name: "Sandalwood & Lavender",
    description: "A calming combination of aromatic sandalwood and soothing lavender, designed to promote relaxation and tranquility.",
    price: 38,
    image: placeholderImage,
    category: "Classic Collection",
    tags: ["calming", "relaxing", "sandalwood", "lavender"],
    rating: 4.7,
    stock: 22,
    isBestSeller: true
  },
  {
    id: 4,
    name: "Bergamot & Jasmine",
    description: "A refreshing and uplifting blend of citrusy bergamot and floral jasmine, perfect for enhancing mood and creating a vibrant atmosphere.",
    price: 40,
    image: placeholderImage,
    category: "Classic Collection",
    tags: ["refreshing", "uplifting", "bergamot", "jasmine"],
    rating: 4.6,
    stock: 20,
    isBestSeller: true
  },
  {
    id: 5,
    name: "Summer Breeze",
    description: "A light and airy fragrance that combines notes of sea salt, coconut, and fresh linen for a breezy summer feeling all year round.",
    price: 36,
    discountPercentage: 20,
    image: placeholderImage,
    category: "Seasonal",
    tags: ["fresh", "light", "summer", "coconut", "sea salt"],
    rating: 4.5,
    stock: 15,
    isNew: true
  },
  {
    id: 6,
    name: "Autumn Spice",
    description: "A warm and inviting blend of cinnamon, clove, and nutmeg that captures the essence of autumn and holiday festivities.",
    price: 36,
    image: placeholderImage,
    category: "Seasonal",
    tags: ["warm", "spicy", "autumn", "cinnamon", "clove"],
    rating: 4.7,
    stock: 12
  },
  {
    id: 7,
    name: "Winter Fir",
    description: "A crisp and invigorating scent of fresh pine needles and winter forest that brings the outdoors inside during colder months.",
    price: 38,
    image: placeholderImage,
    category: "Seasonal",
    tags: ["crisp", "fresh", "winter", "pine", "forest"],
    rating: 4.8,
    stock: 10
  },
  {
    id: 8,
    name: "Spring Bloom",
    description: "A delicate and floral composition with notes of peony, lily of the valley, and fresh-cut grass that celebrates new beginnings.",
    price: 36,
    image: placeholderImage,
    category: "Seasonal",
    tags: ["floral", "fresh", "spring", "peony"],
    rating: 4.6,
    stock: 16,
    isNew: true
  },
  {
    id: 9,
    name: "Luxury Gift Set",
    description: "Our premium gift set featuring three of our bestselling scents in elegant packaging, perfect for special occasions or as a thoughtful present.",
    price: 95,
    image: placeholderImage,
    category: "Gift Sets",
    tags: ["gift", "luxury", "set", "premium"],
    rating: 4.9,
    stock: 8
  },
  {
    id: 10,
    name: "Travel Collection",
    description: "A set of four mini candles in our signature scents, perfect for travelers or those wanting to experience a variety of fragrances.",
    price: 65,
    image: placeholderImage,
    category: "Gift Sets",
    tags: ["travel", "mini", "collection", "variety"],
    rating: 4.7,
    stock: 14,
    isNew: true
  },
  {
    id: 11,
    name: "Rose & Oud",
    description: "An exotic and romantic blend of rose petals and rich oud wood, creating a sophisticated and deeply sensual atmosphere.",
    price: 45,
    image: placeholderImage,
    category: "Classic Collection",
    tags: ["romantic", "exotic", "rose", "oud"],
    rating: 4.8,
    stock: 7
  },
  {
    id: 12,
    name: "Lemongrass & Ginger",
    description: "An energizing and purifying combination of zesty lemongrass and spicy ginger, perfect for kitchens and living spaces.",
    price: 38,
    image: placeholderImage,
    category: "Classic Collection",
    tags: ["energizing", "fresh", "lemongrass", "ginger"],
    rating: 4.5,
    stock: 19
  }
];

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Get best sellers
export const getBestSellers = (): Product[] => {
  return products.filter(product => product.isBestSeller);
};

// Get new arrivals
export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

// Get product by id
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};