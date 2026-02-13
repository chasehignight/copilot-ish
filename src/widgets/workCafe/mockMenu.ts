import type { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: 'breakfast-1',
    name: 'Avocado Toast',
    description: 'Sourdough with smashed avocado, cherry tomatoes, and microgreens',
    price: 8.50,
    category: 'breakfast',
    dietaryFlags: ['vegetarian', 'vegan'],
    modifiers: [
      {
        id: 'bread',
        name: 'Bread Choice',
        type: 'single',
        required: true,
        options: [
          { id: 'sourdough', name: 'Sourdough', price: 0 },
          { id: 'multigrain', name: 'Multigrain', price: 0 },
          { id: 'gluten-free', name: 'Gluten-Free', price: 1.00 }
        ]
      },
      {
        id: 'add-ons-breakfast',
        name: 'Add-ons',
        type: 'multiple',
        options: [
          { id: 'egg', name: 'Poached Egg', price: 2.00 },
          { id: 'feta', name: 'Feta Cheese', price: 1.50 },
          { id: 'bacon', name: 'Bacon', price: 2.50 }
        ]
      }
    ]
  },
  {
    id: 'breakfast-2',
    name: 'Breakfast Burrito',
    description: 'Scrambled eggs, black beans, cheese, salsa, and sour cream',
    price: 9.00,
    category: 'breakfast',
    dietaryFlags: ['vegetarian'],
    modifiers: [
      {
        id: 'protein-burrito',
        name: 'Add Protein',
        type: 'single',
        options: [
          { id: 'none', name: 'No Protein', price: 0 },
          { id: 'bacon', name: 'Bacon', price: 2.00 },
          { id: 'sausage', name: 'Sausage', price: 2.00 },
          { id: 'chicken', name: 'Chicken', price: 2.50 }
        ]
      },
      {
        id: 'spice-level',
        name: 'Spice Level',
        type: 'single',
        required: true,
        options: [
          { id: 'mild', name: 'Mild', price: 0 },
          { id: 'medium', name: 'Medium', price: 0 },
          { id: 'hot', name: 'Hot', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'breakfast-3',
    name: 'Greek Yogurt Parfait',
    description: 'Greek yogurt layered with granola, berries, and honey',
    price: 6.50,
    category: 'breakfast',
    dietaryFlags: ['vegetarian', 'gluten-free'],
    modifiers: [
      {
        id: 'granola-type',
        name: 'Granola',
        type: 'single',
        required: true,
        options: [
          { id: 'regular', name: 'Regular Granola', price: 0 },
          { id: 'gluten-free', name: 'Gluten-Free Granola', price: 0.50 }
        ]
      }
    ]
  },
  {
    id: 'breakfast-4',
    name: 'Bagel with Cream Cheese',
    description: 'Fresh bagel with your choice of cream cheese',
    price: 4.50,
    category: 'breakfast',
    dietaryFlags: ['vegetarian'],
    modifiers: [
      {
        id: 'bagel-type',
        name: 'Bagel Type',
        type: 'single',
        required: true,
        options: [
          { id: 'plain', name: 'Plain', price: 0 },
          { id: 'everything', name: 'Everything', price: 0 },
          { id: 'sesame', name: 'Sesame', price: 0 }
        ]
      },
      {
        id: 'cream-cheese',
        name: 'Cream Cheese',
        type: 'single',
        required: true,
        options: [
          { id: 'plain', name: 'Plain', price: 0 },
          { id: 'veggie', name: 'Veggie', price: 0.50 },
          { id: 'lox', name: 'Lox', price: 2.00 }
        ]
      }
    ]
  },

  // Lunch
  {
    id: 'lunch-1',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan, croutons, and Caesar dressing',
    price: 10.00,
    category: 'lunch',
    dietaryFlags: ['vegetarian'],
    modifiers: [
      {
        id: 'protein-salad',
        name: 'Add Protein',
        type: 'single',
        options: [
          { id: 'none', name: 'No Protein', price: 0 },
          { id: 'grilled-chicken', name: 'Grilled Chicken', price: 3.50 },
          { id: 'grilled-shrimp', name: 'Grilled Shrimp', price: 4.50 },
          { id: 'tofu', name: 'Tofu', price: 3.00 }
        ]
      }
    ]
  },
  {
    id: 'lunch-2',
    name: 'Turkey Club Sandwich',
    description: 'Turkey, bacon, lettuce, tomato, and mayo on toasted bread',
    price: 11.50,
    category: 'lunch',
    dietaryFlags: [],
    modifiers: [
      {
        id: 'bread-sandwich',
        name: 'Bread',
        type: 'single',
        required: true,
        options: [
          { id: 'white', name: 'White', price: 0 },
          { id: 'wheat', name: 'Wheat', price: 0 },
          { id: 'sourdough', name: 'Sourdough', price: 0.50 }
        ]
      },
      {
        id: 'side',
        name: 'Side',
        type: 'single',
        required: true,
        options: [
          { id: 'chips', name: 'Chips', price: 0 },
          { id: 'fruit', name: 'Fresh Fruit', price: 1.00 },
          { id: 'side-salad', name: 'Side Salad', price: 2.00 }
        ]
      }
    ]
  },
  {
    id: 'lunch-3',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomatoes, basil, and marinara',
    price: 12.00,
    category: 'lunch',
    dietaryFlags: ['vegetarian'],
    modifiers: [
      {
        id: 'size-pizza',
        name: 'Size',
        type: 'single',
        required: true,
        options: [
          { id: 'personal', name: 'Personal (8")', price: 0 },
          { id: 'large', name: 'Large (12")', price: 4.00 }
        ]
      },
      {
        id: 'toppings',
        name: 'Extra Toppings',
        type: 'multiple',
        options: [
          { id: 'pepperoni', name: 'Pepperoni', price: 1.50 },
          { id: 'mushrooms', name: 'Mushrooms', price: 1.00 },
          { id: 'olives', name: 'Olives', price: 1.00 },
          { id: 'peppers', name: 'Peppers', price: 1.00 }
        ]
      }
    ]
  },
  {
    id: 'lunch-4',
    name: 'Buddha Bowl',
    description: 'Quinoa, roasted vegetables, chickpeas, and tahini dressing',
    price: 11.00,
    category: 'lunch',
    dietaryFlags: ['vegan', 'gluten-free'],
    modifiers: [
      {
        id: 'protein-bowl',
        name: 'Add Protein',
        type: 'single',
        options: [
          { id: 'none', name: 'No Protein', price: 0 },
          { id: 'tofu', name: 'Tofu', price: 2.50 },
          { id: 'tempeh', name: 'Tempeh', price: 3.00 },
          { id: 'chicken', name: 'Chicken', price: 3.50 }
        ]
      }
    ]
  },
  {
    id: 'lunch-5',
    name: 'Chicken Wrap',
    description: 'Grilled chicken, lettuce, tomatoes, and ranch in a tortilla',
    price: 9.50,
    category: 'lunch',
    dietaryFlags: [],
    modifiers: [
      {
        id: 'wrap-type',
        name: 'Wrap',
        type: 'single',
        required: true,
        options: [
          { id: 'regular', name: 'Regular Tortilla', price: 0 },
          { id: 'wheat', name: 'Wheat Tortilla', price: 0 },
          { id: 'spinach', name: 'Spinach Tortilla', price: 0.50 }
        ]
      }
    ]
  },

  // Coffee
  {
    id: 'coffee-1',
    name: 'Latte',
    description: 'Espresso with steamed milk',
    price: 4.50,
    category: 'coffee',
    dietaryFlags: ['vegetarian'],
    modifiers: [
      {
        id: 'size-coffee',
        name: 'Size',
        type: 'single',
        required: true,
        options: [
          { id: 'small', name: 'Small (12oz)', price: 0 },
          { id: 'medium', name: 'Medium (16oz)', price: 0.75 },
          { id: 'large', name: 'Large (20oz)', price: 1.50 }
        ]
      },
      {
        id: 'milk',
        name: 'Milk',
        type: 'single',
        required: true,
        options: [
          { id: 'whole', name: 'Whole Milk', price: 0 },
          { id: 'skim', name: 'Skim Milk', price: 0 },
          { id: 'oat', name: 'Oat Milk', price: 0.75 },
          { id: 'almond', name: 'Almond Milk', price: 0.75 },
          { id: 'soy', name: 'Soy Milk', price: 0.75 }
        ]
      },
      {
        id: 'flavor',
        name: 'Flavor',
        type: 'multiple',
        options: [
          { id: 'vanilla', name: 'Vanilla', price: 0.50 },
          { id: 'caramel', name: 'Caramel', price: 0.50 },
          { id: 'hazelnut', name: 'Hazelnut', price: 0.50 },
          { id: 'mocha', name: 'Mocha', price: 0.75 }
        ]
      }
    ]
  },
  {
    id: 'coffee-2',
    name: 'Cappuccino',
    description: 'Espresso with foamed milk',
    price: 4.25,
    category: 'coffee',
    dietaryFlags: ['vegetarian'],
    modifiers: [
      {
        id: 'size-coffee',
        name: 'Size',
        type: 'single',
        required: true,
        options: [
          { id: 'small', name: 'Small (12oz)', price: 0 },
          { id: 'medium', name: 'Medium (16oz)', price: 0.75 },
          { id: 'large', name: 'Large (20oz)', price: 1.50 }
        ]
      },
      {
        id: 'milk',
        name: 'Milk',
        type: 'single',
        required: true,
        options: [
          { id: 'whole', name: 'Whole Milk', price: 0 },
          { id: 'skim', name: 'Skim Milk', price: 0 },
          { id: 'oat', name: 'Oat Milk', price: 0.75 },
          { id: 'almond', name: 'Almond Milk', price: 0.75 },
          { id: 'soy', name: 'Soy Milk', price: 0.75 }
        ]
      }
    ]
  },
  {
    id: 'coffee-3',
    name: 'Cold Brew',
    description: 'Smooth cold-brewed coffee',
    price: 4.00,
    category: 'coffee',
    dietaryFlags: ['vegan'],
    modifiers: [
      {
        id: 'size-coffee',
        name: 'Size',
        type: 'single',
        required: true,
        options: [
          { id: 'small', name: 'Small (12oz)', price: 0 },
          { id: 'medium', name: 'Medium (16oz)', price: 0.75 },
          { id: 'large', name: 'Large (20oz)', price: 1.50 }
        ]
      },
      {
        id: 'sweetener',
        name: 'Sweetener',
        type: 'single',
        options: [
          { id: 'none', name: 'No Sweetener', price: 0 },
          { id: 'simple', name: 'Simple Syrup', price: 0 },
          { id: 'vanilla', name: 'Vanilla Syrup', price: 0.50 }
        ]
      }
    ]
  },
  {
    id: 'coffee-4',
    name: 'Matcha Latte',
    description: 'Premium matcha powder with steamed milk',
    price: 5.00,
    category: 'coffee',
    dietaryFlags: ['vegetarian'],
    modifiers: [
      {
        id: 'size-coffee',
        name: 'Size',
        type: 'single',
        required: true,
        options: [
          { id: 'small', name: 'Small (12oz)', price: 0 },
          { id: 'medium', name: 'Medium (16oz)', price: 0.75 },
          { id: 'large', name: 'Large (20oz)', price: 1.50 }
        ]
      },
      {
        id: 'milk',
        name: 'Milk',
        type: 'single',
        required: true,
        options: [
          { id: 'whole', name: 'Whole Milk', price: 0 },
          { id: 'skim', name: 'Skim Milk', price: 0 },
          { id: 'oat', name: 'Oat Milk', price: 0.75 },
          { id: 'almond', name: 'Almond Milk', price: 0.75 },
          { id: 'soy', name: 'Soy Milk', price: 0.75 }
        ]
      }
    ]
  },

  // Snacks
  {
    id: 'snack-1',
    name: 'Chocolate Chip Cookie',
    description: 'Fresh baked chocolate chip cookie',
    price: 2.50,
    category: 'snacks',
    dietaryFlags: ['vegetarian'],
    modifiers: []
  },
  {
    id: 'snack-2',
    name: 'Blueberry Muffin',
    description: 'Moist muffin loaded with blueberries',
    price: 3.50,
    category: 'snacks',
    dietaryFlags: ['vegetarian'],
    modifiers: [
      {
        id: 'warmed',
        name: 'Preparation',
        type: 'single',
        required: true,
        options: [
          { id: 'room-temp', name: 'Room Temperature', price: 0 },
          { id: 'warmed', name: 'Warmed', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'snack-3',
    name: 'Hummus & Veggies',
    description: 'Fresh vegetables with house-made hummus',
    price: 5.00,
    category: 'snacks',
    dietaryFlags: ['vegan', 'gluten-free'],
    modifiers: []
  },
  {
    id: 'snack-4',
    name: 'Energy Bar',
    description: 'Organic nuts, seeds, and dried fruit',
    price: 3.00,
    category: 'snacks',
    dietaryFlags: ['vegan', 'gluten-free'],
    modifiers: [
      {
        id: 'flavor-bar',
        name: 'Flavor',
        type: 'single',
        required: true,
        options: [
          { id: 'almond', name: 'Almond', price: 0 },
          { id: 'peanut', name: 'Peanut Butter', price: 0 },
          { id: 'berry', name: 'Mixed Berry', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'snack-5',
    name: 'Fruit Cup',
    description: 'Fresh seasonal fruit',
    price: 4.00,
    category: 'snacks',
    dietaryFlags: ['vegan', 'gluten-free'],
    modifiers: []
  }
];
