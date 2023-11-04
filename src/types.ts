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
  country?: String;
  usingDefaultGeo?: Boolean;
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

export interface Feature {
  id: string
  type: string
  place_type: string[]
  relevance: number
  properties: FeatureProperties
  text: string
  place_name: string
  center: number[]
  geometry: FeatureGeometry
  context: FeatureContext[]
}

export interface FeatureProperties {
  foursquare: string
  landmark: boolean
  address: string
  category: string
}

export interface FeatureGeometry {
  coordinates: number[]
  type: string
}

export interface FeatureContext {
  id: string
  mapbox_id: string
  text: string
  wikidata?: string
  short_code?: string
}
