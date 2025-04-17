export interface BiCycle {
    name: string;
    brand: string;
    price: number;
    
    type: 'Mountain' | 'Road' | 'Hybrid' | 'Bmx' | 'Electric';
    description: string;
    image: string[];
    quantity: number;
    inStock?: boolean;
  }
  