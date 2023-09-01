import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirst(str: string) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

export function normalizeGeo(geo: string) {
  let valid = true;

  // TODO: handle geo check better
  const geoParams = geo.split('.');

  let city = geoParams[0];
  if (city.split('-').length > 1) {
    let cs = '';
    city.split('-').forEach((c) => {
      cs += capitalizeFirst(c) + ' ';
    })
    city = cs.trim();
  } else {
    city = capitalizeFirst(city);
  }

  const region = geoParams[1]?.toUpperCase();
  const country = geoParams[2]?.toUpperCase()

  return {
    valid,
    city,
    region,
    country,
  }
}