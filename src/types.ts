import type { Database } from '@/db_types';

export type Deal = Database['public']['Tables']['deals']['Row'];
export type Business = Database['public']['Tables']['businesses']['Row'];

export interface IndexPageProps {
  params: Object;
  searchParams: {
    city: String;
    region: String;
    country: String;
    usingDefaultGeo: Boolean;
  };
}

export interface DialogProps {
  city: String;
  region: String;
  country: String;
  usingDefaultGeo: Boolean;
}

export interface CityPageProps {
  params: {
    geo: string;
  };
}

export interface DealWithBusiness extends Deal {
  businesses: Business | null;
}

export interface DealModuleProps {
  deals: DealWithBusiness[] | null;
}
