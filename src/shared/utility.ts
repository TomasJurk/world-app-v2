import { CountriesListItemType, LanguagesListItemType } from "./types";

export const sortByName = (
  countries: CountriesListItemType[],
  sortWay: string
) =>
  sortWay === "des"
    ? [...countries].sort((a, b) => a.name.localeCompare(b.name))
    : [...countries].sort((a, b) => b.name.localeCompare(a.name));

export const sortByNumbers = (
  countries: CountriesListItemType[],
  sortName: string,
  sortWay: string
) => {
  return [...countries].sort((a, b) => {
    if (isNaN(+a[sortName]) || a[sortName] === 0) {
      return 1;
    } else if (isNaN(+b[sortName]) || b[sortName] === 0) {
      return -1;
    } else {
      return sortWay === "asc"
        ? +a[sortName] - +b[sortName]
        : +b[sortName] - +a[sortName];
    }
  });
};

export const calculateSummaryFacts = (countries: CountriesListItemType[]) => {
  const inhabitedCountries = countries.filter(
    (country) => country.population > 0
  ).length;
  const totalPopulation = countries.reduce((a, b) => {
    return a + +b.population;
  }, 0);
  const averagePopulation =
    Math.round(totalPopulation / inhabitedCountries / 100000) / 10;

  const biggestArea = { name: "", area: 0 };
  const smallestArea = { name: "", area: Number.MAX_VALUE };

  for (let i = 0; i < countries.length; i++) {
    if (countries[i].area > biggestArea.area) {
      biggestArea.area = +countries[i].area;
      biggestArea.name = countries[i].name;
    }
    if (countries[i].area < smallestArea.area) {
      smallestArea.area = +countries[i].area;
      smallestArea.name = countries[i].name;
    }
  }

  return {
    averagePopulation,
    biggestArea,
    smallestArea,
  };
};

export const filterLanguages = (countries: CountriesListItemType[]) => {
  const filteredByLanguages: { [key: string]: LanguagesListItemType } = {};

  for (let i = 0; i < countries.length; i++) {
    countries[i].languages.forEach((lang) => {
      if (!filteredByLanguages.hasOwnProperty(lang.name)) {
        filteredByLanguages[lang.name] = {} as LanguagesListItemType;
        filteredByLanguages[lang.name].countries = [];
        filteredByLanguages[lang.name].countries.push(countries[i].name);
        filteredByLanguages[lang.name].totalSpeakers = +countries[i].population;
        filteredByLanguages[lang.name].name = lang.name;
      } else {
        filteredByLanguages[lang.name].countries.push(countries[i].name);
        filteredByLanguages[lang.name].totalSpeakers +=
          +countries[i].population;
      }
    });
  }

  return filteredByLanguages;
};
