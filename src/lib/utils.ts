import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isAfter, isBefore } from 'date-fns';
import { format } from 'date-fns-tz';

import { DealWithBusiness, Feature, FeatureContext } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirst(str: string) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

export const isActiveDealTime = (deal: DealWithBusiness): Boolean => {
  const { time_start, time_end } = deal;
  if (!time_start && !time_end) return true;

  const now = new Date();
  const todayString = format(now, 'yyyy-MM-dd');

  if (time_start && time_end) {
    // check now is between both
    return (
      isAfter(now, new Date(`${todayString}T${time_start}`)) &&
      isBefore(now, new Date(`${todayString}T${time_end}`))
    );
  } else if (time_start) {
    // check now is after
    return isAfter(now, new Date(`${todayString}T${time_start}`));
  } else if (time_end) {
    // check now is before
    return isBefore(now, new Date(`${todayString}T${time_end}`));
  }
  return true;
};

// normalizes a mapbox feature into geo
export function normalizeGeoFromMB(geo: Feature) {
  const { context, text } = geo;
  const city = text;
  const regionContext = context.find((c: FeatureContext) => c.id.includes('region'));
  const region = regionContext?.short_code?.split('-')[1];
  const country = regionContext?.short_code?.split('-')[0];

  return {
    city,
    region,
    country,
  };
}

// normalizes a geo string ie. City,%20REGION,%20COUNTRY
export function normalizeGeo(geo: string) {
  let usingDefaultGeo = false;
  const geoParams = decodeURI(geo).replaceAll('%2C', ',').split(',');

  let city = geoParams[0];
  if (city.split(' ').length > 1) {
    let cs = '';
    city.split(' ').forEach((c: string) => {
      cs += capitalizeFirst(c) + ' ';
    });
    city = cs.trim();
  } else {
    city = capitalizeFirst(city);
  }

  const region = geoParams[1]?.toUpperCase().trim() || undefined;
  const country = geoParams[2]?.toUpperCase().trim() || undefined;

  return {
    city,
    region,
    country,
    usingDefaultGeo,
  };
}
