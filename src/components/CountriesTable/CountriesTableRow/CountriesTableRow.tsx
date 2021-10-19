import { CountriesListItemType } from "../../../shared/types";

export const CountriesTableRow = ({
  name,
  region,
  area,
  population,
}: Omit<CountriesListItemType, "langueges">) => {
  let formatedPopulation: number | string = "Uninhabited";
  if (population > 0 && typeof population === "number") {
    formatedPopulation =
      population / 1000000 >= 0.1
        ? Math.round(population / 100000) / 10
        : "< 0.1";
  }
  const formatedArea =
    typeof area === "number" ? Math.round(area / 2.59) : area;
  return (
    <tr>
      <td>{name}</td>
      <td>{region}</td>
      <td>{formatedArea}</td>
      <td>{formatedPopulation}</td>
    </tr>
  );
};
