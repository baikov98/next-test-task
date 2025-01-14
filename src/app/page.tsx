import Image from "next/image";
import { Country } from "@/types/api";
import styles from "./page.module.css";
import Table from "@/components/table";
import { formatStrangeUrl } from "@/utils/format-img-url";

async function getCountries() {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json"
    );
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.log("Error while fetching countries", error);
  }
}

export default async function Home() {
  const countries = await getCountries();

  const formattedData = countries?.map((country) => ({
    ...country,
    flag_url: country.flag_url && formatStrangeUrl(country.flag_url),
  }));

  return (
    <div className={styles.page}>
      <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <main className={styles.main}>
        {formattedData ? (
          <Table countries={formattedData} />
        ) : (
          <div>Error while fetching countries</div>
        )}
      </main>
    </div>
  );
}
