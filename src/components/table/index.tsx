"use client";
import { useState, useCallback } from "react";
import { Country } from "@/types/api";
import styles from "./table.module.css";
import TableRow from "./row-item";

export default function Table({ countries }: { countries: Country[] }) {
  const [countriesList, setCountriesList] = useState(countries);

  const deleteCountry = useCallback((isoCode3: string) => {
    setCountriesList((previousState) =>
      previousState.filter((country) => country.iso_code3 !== isoCode3)
    );
  }, []);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Flag</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {countriesList.map((country) => (
          <TableRow
            country={country}
            deleteCountry={deleteCountry}
            key={country.iso_code3}
          />
        ))}
      </tbody>
    </table>
  );
}
