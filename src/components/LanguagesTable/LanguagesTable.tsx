import styles from './LanguagesTable.module.css';
import { LanguagesTableRow } from './LanguagesTableRow/LanguagesTableRow';
import { LanguagesListItemType } from '../../shared/types';

type LanguagesTableProps = {
    languages: {
        [key: string]: LanguagesListItemType
    }
}

export const LanguagesTable = ({ languages }: LanguagesTableProps) => {
  const languageRows = Object.keys(languages).map((lang, i) => (
    <LanguagesTableRow
      key={`${i}_${lang}`}
      name={languages[lang].name}
      countries={languages[lang].countries}
      totalSpeakers={languages[lang].totalSpeakers}
    />
  ));

  return (
    <section className={styles.LanguagesList}>
      <header>
        <h2>World languages list</h2>
      </header>
      <div className={styles.TableWrapper}>
        <table className={styles.LanguagesTable}>
          <thead>
            <tr>
              <th>Language</th>
              <th>Countries</th>
              <th>Aprx. speaking population (mil)</th>
            </tr>
          </thead>
          <tbody>{languageRows}</tbody>
        </table>
      </div>
    </section>
  );
};
