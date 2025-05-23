export interface SearchCriteria {
  id: string;
  name: string;
  category: string;
  keywords: string;
  priceMin?: number;
  priceMax?: number;
  location: string;
  radius: number;
  mileageMax?: number;
  fuelType?: string;
  yearMin?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  distance: number;
  mileage?: number;
  year?: number;
  fuelType?: string;
  seller: {
    name: string;
    phone?: string;
    isProfessional: boolean;
  };
  url: string;
  publishedAt: Date;
  source: 'leboncoin' | 'lacentrale' | 'other';
  aiScore?: number;
  aiTags?: string[];
}

export interface Notification {
  id: string;
  type: 'email' | 'sms' | 'push';
  title: string;
  message: string;
  status: 'sent' | 'pending' | 'failed';
  sentAt?: Date;
  advertisementId?: string;
  criteriaId: string;
}

export interface AIInsight {
  id: string;
  type: 'price_opportunity' | 'rare_find' | 'price_drop' | 'new_listing';
  title: string;
  description: string;
  confidence: number;
  advertisementId: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalAds: number;
  newToday: number;
  averagePrice: number;
  priceDrops: number;
  opportunities: number;
}

export interface FilterOptions {
  priceMin?: number;
  priceMax?: number;
  mileageMax?: number;
  yearMin?: number;
  location?: string;
  radius?: number;
  fuelType?: string;
  sortBy: 'date' | 'price' | 'distance' | 'ai_score';
  sortOrder: 'asc' | 'desc';
} 