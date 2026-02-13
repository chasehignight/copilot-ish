export type Category = 'breakfast' | 'lunch' | 'coffee' | 'snacks';

export type DietaryFlag = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free';

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface Modifier {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  options: ModifierOption[];
  required?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image?: string;
  dietaryFlags: DietaryFlag[];
  modifiers: Modifier[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedModifiers: { [modifierId: string]: string[] }; // modifierId -> selected option ids
  specialInstructions?: string;
  itemTotal: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  pickupTime: string;
  total: number;
  timestamp: number;
  status: 'received' | 'preparing' | 'ready' | 'completed';
}

export interface OrderHistory {
  orders: Order[];
  topItems: { itemId: string; count: number }[];
  modifierPreferences: { [modifierId: string]: string[] };
}
