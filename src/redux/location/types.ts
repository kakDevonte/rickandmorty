export type LocationType = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
};

export type LocationState = {
  location: LocationType | null;
};

