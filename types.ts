export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  concern: string;
  rating: number;
  proTip: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string; // Placeholder or actual URL
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
}
