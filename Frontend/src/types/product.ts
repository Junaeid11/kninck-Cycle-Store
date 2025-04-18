

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;

  category: {
    _id: string;
    name: string;
    slug: string;
    icon: string;
    parent: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  price: number;
  discountPrice: number;
  stock: number;
  quantity: number;
  inStock: boolean;

  imageUrls: string[];

  isActive: boolean;

  specs?: {
    brakes?: string;
    [key: string]: string | undefined;
  };

  rating?: number;

  reviews: {
    _id: string;
    user: string;
    comment: string;
    rating: number;
    date: string;
  }[];

  variants: {
    colors: string[];
    sizes: string[];
  };

  createdAt?: string;
  updatedAt?: string;
}

  export interface IMealForm {
    name: string;
    description: string;
    slug: string;
    ingredients: string;
    price: string;
    stock: string;
    rating: string;
    ratingCount: string;
    preparationTime: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    dietaryTags: string[];
}

