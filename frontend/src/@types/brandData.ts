export interface BrandData {
  id: number;
  name: string;
  description: string;
  niche: string;
}

export interface NewBrandData {
    name: string;
    description?: string;
    niche?: string;
}