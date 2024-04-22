import type { Database } from '@/db_types';

export type Deal = Database['public']['Tables']['deals']['Row'];
export type Business = Database['public']['Tables']['businesses']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Role = Database['public']['Tables']['roles']['Row'];

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
  city?: String;
  region?: String;
  country?: String;
  usingDefaultGeo?: Boolean;
}

export interface CityDeprecatedPageProps {
  params: {
    geo: string;
  };
}

export interface GeoObj {
  city: string
  region: string
  country: string
}

export interface CityPageProps {
  params: GeoObj
}

export interface DealWithBusiness extends Deal {
  businesses: Business | null;
}

export interface DealModuleProps {
  deals: DealWithBusiness[] | null;
}

// Mapbox Feature
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

// Mapbox Suggestion
export interface Suggestion {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: SuggestionContext;
  language: string;
  maki: string;
  poi_category?: (string)[] | null;
  poi_category_ids?: (string)[] | null;
  external_ids: ExternalIds;
  metadata: SuggestionMetadata;
  distance: number;
}
export interface SuggestionContext {
  country: Country;
  region: Region;
  postcode: PostcodeOrPlace;
  place: PostcodeOrPlace;
  address: Address;
  street: Street;
}
export interface Country {
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}
export interface Region {
  name: string;
  region_code: string;
  region_code_full: string;
}
export interface PostcodeOrPlace {
  id: string;
  name: string;
}
export interface Address {
  name: string;
  address_number: string;
  street_name: string;
}
export interface Street {
  name: string;
}
export interface ExternalIds {
  foursquare: string;
}
export interface SuggestionMetadata {
  phone: string;
  website: string;
  opening_hours: OpeningHours;
  primary_photo_urls?: (null)[] | null;
}
export interface OpeningHours {
  opening_hours: string;
}

export interface CreateBusinessStructure {
  name: string
  type: string
  street: string
  city: string
  region: string
  zipcode: string
  website: string
}

export interface CreateDealStructure {
  business: string
  type: string
  category: string
  day: string
  description: string
  time_start: string
  time_end: string
}
