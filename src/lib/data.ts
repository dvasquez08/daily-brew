import type { MenuItem, Order } from './types';

export const menuItems: MenuItem[] = [
  {
    id: 'food-1',
    name: 'Avocado Toast',
    description: 'Crispy sourdough topped with fresh avocado, chili flakes, and a hint of lime.',
    price: 8.50,
    category: 'Food',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'avocado toast',
    customizableOptions: [
      { id: 'add-egg', name: 'Add Poached Egg', options: [{ id: 'poached-egg', name: 'Yes', priceChange: 2.00 }], allowsMultiple: false },
      { id: 'gluten-free', name: 'Gluten-Free Bread', options: [{ id: 'gf-bread', name: 'Yes', priceChange: 1.50 }], allowsMultiple: false },
    ]
  },
  {
    id: 'food-2',
    name: 'Breakfast Burrito',
    description: 'Scrambled eggs, cheese, black beans, and salsa wrapped in a warm tortilla.',
    price: 9.00,
    category: 'Food',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'breakfast burrito',
  },
  {
    id: 'smoothie-1',
    name: 'Green Goddess Smoothie',
    description: 'Spinach, kale, banana, pineapple, and coconut water for a healthy boost.',
    price: 7.00,
    category: 'Smoothies',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'green smoothie',
    customizableOptions: [
      { id: 'protein-boost', name: 'Protein Boost', options: [
        { id: 'whey-protein', name: 'Whey Protein', priceChange: 1.50 },
        { id: 'vegan-protein', name: 'Vegan Protein', priceChange: 1.50 },
      ], allowsMultiple: false },
      { id: 'add-chia', name: 'Add Chia Seeds', options: [{ id: 'chia-seeds', name: 'Yes', priceChange: 0.75 }], allowsMultiple: false },
    ]
  },
  {
    id: 'smoothie-2',
    name: 'Berry Blast Smoothie',
    description: 'A delightful mix of strawberries, blueberries, raspberries, banana, and almond milk.',
    price: 7.50,
    category: 'Smoothies',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'berry smoothie',
  },
  {
    id: 'coffee-1',
    name: 'Classic Latte',
    description: 'Rich espresso with steamed milk, topped with a thin layer of foam.',
    price: 4.50,
    category: 'Coffee',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'latte coffee',
    customizableOptions: [
      { id: 'milk-type', name: 'Milk Type', options: [
        { id: 'whole-milk', name: 'Whole Milk' },
        { id: 'skim-milk', name: 'Skim Milk' },
        { id: 'almond-milk', name: 'Almond Milk', priceChange: 0.75 },
        { id: 'oat-milk', name: 'Oat Milk', priceChange: 0.75 },
      ], allowsMultiple: false },
      { id: 'syrup-flavor', name: 'Flavor Shot', options: [
        { id: 'no-syrup', name: 'None' },
        { id: 'vanilla-syrup', name: 'Vanilla', priceChange: 0.50 },
        { id: 'caramel-syrup', name: 'Caramel', priceChange: 0.50 },
        { id: 'hazelnut-syrup', name: 'Hazelnut', priceChange: 0.50 },
      ], allowsMultiple: false }
    ]
  },
  {
    id: 'coffee-2',
    name: 'Iced Coffee',
    description: 'Chilled coffee served over ice, perfect for a warm day.',
    price: 3.75,
    category: 'Coffee',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'iced coffee',
  }
];

export const orderHistory: Order[] = [
  {
    id: 'order-123',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    items: [
      { ...menuItems.find(item => item.id === 'smoothie-1')!, quantity: 1 },
      { ...menuItems.find(item => item.id === 'food-1')!, quantity: 1, customizations: [{ optionId: 'add-egg', optionName: 'Add Poached Egg', selectedValue: 'poached-egg', selectedName: 'Yes', priceChange: 2.00 }] },
    ],
    totalAmount: 17.50,
    status: 'Delivered',
    customerDetails: { name: 'Jane Doe', email: 'jane@example.com' }
  },
  {
    id: 'order-456',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    items: [
      { ...menuItems.find(item => item.id === 'coffee-1')!, quantity: 2, customizations: [{ optionId: 'milk-type', optionName: 'Milk Type', selectedValue: 'oat-milk', selectedName: 'Oat Milk', priceChange: 0.75 }] },
    ],
    totalAmount: 10.50, // (4.50 + 0.75) * 2
    status: 'Delivered',
    customerDetails: { name: 'John Smith', email: 'john@example.com' }
  },
];
