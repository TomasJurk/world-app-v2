type ObjectKeys = {
  [key: string]: number | string;
};

export type CountriesListItemType = {
  name: string;
  region: string;
  area: number | string;
  population: number | string;
  languages: {
      [key: string]: string
  }[]
} & ObjectKeys;

export type LanguagesListItemType = {
  name: string;
  countries: string[];
  totalSpeakers: number;
};
