export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Food' | 'Smoothies' | 'Coffee' | 'Other Drinks';
  imageUrl: string;
  customizableOptions?: CustomizationOption[];
  dataAiHint?: string;
}

export interface CustomizationOption {
  id: string;
  name: string; // e.g., "Milk Type", "Size", "Add-ons"
  options: {
    id: string;
    name: string; // e.g., "Almond Milk", "Large", "Protein Powder"
    priceChange?: number; // e.g., 0.5 for almond milk, 1 for protein powder
  }[];
  allowsMultiple?: boolean; // For add-ons where multiple can be selected
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations?: SelectedCustomization[];
}

export interface SelectedCustomization {
  optionId: string; // ID of the CustomizationOption (e.g., "Milk Type")
  optionName: string; // Name of the CustomizationOption
  selectedValue: string; // ID of the selected option (e.g., "Almond Milk" ID)
  selectedName: string; // Name of the selected option
  priceChange?: number;
}

export interface Order {
  id: string;
  date: string; // ISO string
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';
  customerDetails?: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface SmoothieSuggestion {
  smoothieName: string;
  ingredients: string[];
  instructions: string;
  description: string;
}
