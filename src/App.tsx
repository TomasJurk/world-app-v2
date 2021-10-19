import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import styles from './App.module.css';

import { Spinner } from './components/Spinner/Spinner';
import { CountriesTable } from './components/CountriesTable/CountriesTable';
import { Summary } from './components/Summary/Summary';
import { LanguagesTable } from './components/LanguagesTable/LanguagesTable';
import { sortByName, sortByNumbers, calculateSummaryFacts, filterLanguages } from './shared/utility';
import { CountriesListItemType, LanguagesListItemType, SummaryFacts } from './shared/types';

const App = () => {
  const [countries, setCountries] = useState<CountriesListItemType[]>([] as CountriesListItemType[]);
  const [sortOption, setSortOption] = useState('name$des');
  const [summary, setSummary] = useState<SummaryFacts>({} as SummaryFacts);
  const [languages, setLanguages] = useState<{ [key: string]: LanguagesListItemType } | {}>({});

  useEffect(() => {
    fetchCountries().catch(error => console.log(error));
  }, []);

  const fetchCountries = async () => {
    const url = 'https://restcountries.com/v2/all?fields=name,region,area,population,languages';
    try {
      const countries: { data: CountriesListItemType[] } = await axios.get(url, { timeout: 5000 });
      setCountries(countries.data);
      setSummary(calculateSummaryFacts(countries.data));
      setLanguages(filterLanguages(countries.data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Error:', error.message);
      }
    }
  };

  const sortCountries = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortName, sortWay] = event.target.value.split('$');
    setSortOption(event.target.value);
    if (sortName === 'name') {
      setCountries(sortByName(countries, sortWay));
    } else if (sortName === 'area' || sortName === 'population') {
      setCountries(sortByNumbers(countries, sortName, sortWay));
    }
  };

  if (countries.length === 0) {
    return (
      <div className={styles.App}>
        <nav></nav>
        <header>
          <h1>List of coutries</h1>
        </header>
        <Spinner />
      </div>
    );
  }

  return (
    <Router>
      <div className={styles.App}>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName={styles.SelectedLink}>
                World countries
              </NavLink>
            </li>
            <li>
              <NavLink to="/languages" activeClassName={styles.SelectedLink}>
                World languages
              </NavLink>
            </li>
          </ul>
        </nav>
        <header>
          <h1>List of coutries</h1>
        </header>
        <Switch>
          <Route exact path="/">
            <div className={styles.SortingContainer}>
              <label>
                Sort countries by:
                <select value={sortOption} onChange={e => sortCountries(e)}>
                  <option value="name$des">Name A-Z</option>
                  <option value="name$asc">Name Z-A</option>
                  <option value="area$des">Area high-low</option>
                  <option value="area$asc">Area low-high</option>
                  <option value="population$des">Population high-low</option>
                  <option value="population$asc">Population low-high</option>
                </select>
              </label>
            </div>
            <CountriesTable countries={countries} />
            <Summary summary={summary} />
          </Route>
          <Route path="/languages">
            <LanguagesTable languages={languages} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
