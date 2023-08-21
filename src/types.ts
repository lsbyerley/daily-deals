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

export interface DealCardProps extends Deal {
  businesses: Business | null
}
