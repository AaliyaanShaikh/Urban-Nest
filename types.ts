
export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  description: string;
  virtualTourUrl?: string;
  category?: 'exclusive' | 'archived';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
