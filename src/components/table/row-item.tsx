"use client";
import { useRef, useEffect } from "react";
import { memo } from 'react';
import Image from "next/image";
import { Country } from "@/types/api";
import styles from "./table.module.css";

function TableRow({
  country,
  deleteCountry,
}: {
  country: Country;
  deleteCountry: (isoCode3: string) => void;
}) {
  const { flag_url, name_ru, iso_code3 } = country;

  const rowElementRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    rowElementRef.current?.addEventListener("transitionend", (e) => {
      if (e.propertyName === "opacity") {
        deleteCountry(iso_code3);
      }
    });
  }, []);
  
  return (
    <tr ref={rowElementRef}>
      <td>
        {!!flag_url && (
          <div className={styles.flag}>
            <Image
              className={styles.logo}
              src={flag_url}
              alt={`${name_ru} флаг`}
              fill
            />
          </div>
        )}
      </td>
      <td>{name_ru}</td>
      <td>
        <button
          onClick={() => {
            rowElementRef.current?.classList.add(styles.deleted);
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
}

export default memo(TableRow)