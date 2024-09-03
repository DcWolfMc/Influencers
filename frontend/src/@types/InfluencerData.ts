export interface NewInfluencerData {
  name: string;
  instagram_name: string;
  followers: number;
  following: number;
  image?: string;
  email: string;
  address: string;
  categories?: string[];
  brands?: string[];
}

export interface InfluencerData {
  id: number;
  name: string;
  instagram_name: string;
  followers: number;
  following: number;
  image: string;
  email: string;
  address: string;
  categories?: CategoriesType[];
  brands?: BrandType[];
}

export type CategoriesType = {
  id: number;
  name: string;
};

export type BrandType = {
  id: 1;
  name: string;
  description: string;
  niche: string;
};

export interface GetAllInfluencersData {
  influencers: InfluencerData[];
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
