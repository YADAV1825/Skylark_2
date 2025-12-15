export interface ShippingFormData {
  pickupCity: string;
  deliveryCity: string;
  weight: number; // in kg
}

export type ServiceTier = 'Standard' | 'Speed' | 'Express';

export interface ShippingQuote {
  tier: ServiceTier;
  cost: number;
  currency: string;
  days: number;
  deliveryDate: string;
  features: string[];
}

export interface AdvisoryResult {
  text: string;
  recommendation?: ServiceTier;
}