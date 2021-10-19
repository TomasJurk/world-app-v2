import styles from "./Summary.module.css";
import { SummaryFacts } from "../../shared/types";

type SummaryProps = {
  summary: SummaryFacts;
};

export const Summary = ({ summary }: SummaryProps) => {
  if (
    !summary.averagePopulation ||
    !summary.biggestArea ||
    !summary.smallestArea
  ) {
    return <div />;
  }

  return (
    <div className={styles.Summary}>
      <ul>
        <li>
          <p>
            Average population is: <span>{summary.averagePopulation}</span>{" "}
            million inhabitants
          </p>
        </li>
        <li>
          <p>
            Country with the biggest area is {summary.biggestArea.name}, with
            area of: <span>{summary.biggestArea.area} square km</span> or{" "}
            <span>
              {Math.round(+summary.biggestArea.area / 2.59)} square miles
            </span>
          </p>
        </li>
        <li>
          <p>
            Country with the smallest area is {summary.smallestArea.name}, with
            area of: <span>{summary.smallestArea.area} square km</span> or{" "}
            <span>
              {Math.round((+summary.smallestArea.area / 2.59) * 100) / 100}{" "}
              square miles
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
};
