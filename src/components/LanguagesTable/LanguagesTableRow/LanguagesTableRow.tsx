import { LanguagesListItemType } from "../../../shared/types";

export const LanguagesTableRow = ({
  name,
  countries,
  totalSpeakers,
}: LanguagesListItemType) => {
  const countriesView = countries.map((country, i) => {
    if (i === countries.length - 1) {
      return <span key={`${i}_${country}`}>{country}</span>;
    }
    return <span key={`${i}_${country}`}>{country + ", "}</span>;
  });

  let formatedPopulation =
    totalSpeakers / 1000000 >= 0.1
      ? Math.round(totalSpeakers / 100000) / 10
      : "< 0.1";

  return (
    <tr>
      <td>{`${name} (${countries.length})`}</td>
      <td>{countriesView}</td>
      <td>{formatedPopulation}</td>
    </tr>
  );
};
