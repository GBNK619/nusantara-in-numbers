// data.js — every dataset shown by NUSANTARA IN NUMBERS, in one place.
// Figures are the official numbers published by BPS (Statistics Indonesia),
// rounded where a chart needs a short label; each dataset names its year.

export const SOURCE_NOTE = 'Source: BPS — Statistics Indonesia';

// Headline indicators for the overview page's KPI cards.
export const KPI_CARDS = [
  { label: 'Population', value: '284.4 million', year: 'mid-2025 estimate', note: 'The world\u2019s fourth most populous country.' },
  { label: 'Gross domestic product', value: 'US$1.40 trillion', year: '2024', note: 'The largest economy in Southeast Asia.' },
  { label: 'Economic growth', value: '5.03%', year: '2024', note: 'GDP growth, year on year.' },
  { label: 'Inflation', value: '1.57%', year: 'December 2024', note: 'Consumer prices, year on year.' },
  { label: 'Open unemployment', value: '4.76%', year: 'February 2025', note: 'Share of the labour force without work.' },
  { label: 'Poverty rate', value: '8.57%', year: 'September 2024', note: 'Share of people below the poverty line.' },
];

// Annual real GDP growth, percent year on year (BPS).
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 }, { year: 2017, value: 5.07 },
  { year: 2018, value: 5.17 }, { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// Annual inflation, December year on year, percent (BPS).
export const INFLATION = [
  { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 }, { year: 2017, value: 3.61 },
  { year: 2018, value: 3.13 }, { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Total population at each census and the latest mid-year estimate, millions (BPS).
export const POPULATION_HISTORY = [
  { year: 1971, value: 119.2, kind: 'Census' }, { year: 1980, value: 147.5, kind: 'Census' },
  { year: 1990, value: 179.4, kind: 'Census' }, { year: 2000, value: 206.3, kind: 'Census' },
  { year: 2010, value: 237.6, kind: 'Census' }, { year: 2020, value: 270.2, kind: 'Census' },
  { year: 2025, value: 284.4, kind: 'Estimate' },
];

// Population structure 2024: share of the total population, percent, by age group.
export const AGE_PYRAMID = [
  { group: '0–4', male: 4.3, female: 4.1 }, { group: '5–9', male: 4.3, female: 4.1 },
  { group: '10–14', male: 4.2, female: 4.0 }, { group: '15–19', male: 4.2, female: 4.0 },
  { group: '20–24', male: 4.3, female: 4.1 }, { group: '25–29', male: 4.2, female: 4.1 },
  { group: '30–34', male: 4.0, female: 3.9 }, { group: '35–39', male: 3.8, female: 3.7 },
  { group: '40–44', male: 3.5, female: 3.5 }, { group: '45–49', male: 3.1, female: 3.2 },
  { group: '50–54', male: 2.7, female: 2.8 }, { group: '55–59', male: 2.2, female: 2.4 },
  { group: '60–64', male: 1.8, female: 2.0 }, { group: '65–69', male: 1.3, female: 1.5 },
  { group: '70–74', male: 0.9, female: 1.1 }, { group: '75+', male: 0.9, female: 1.4 },
];

// People per square kilometre by island group, 2024 (BPS figures, rounded).
export const ISLAND_DENSITY = [
  { island: 'Java', density: 1180 }, { island: 'Bali', density: 750 },
  { island: 'Nusa Tenggara', density: 145 }, { island: 'Sumatra', density: 130 },
  { island: 'Sulawesi', density: 110 }, { island: 'Maluku', density: 45 },
  { island: 'Kalimantan', density: 33 }, { island: 'Papua', density: 15 },
];

// GDP per capita, current US dollars (BPS / World Bank series, rounded).
export const GDP_PER_CAPITA = [
  { year: 2015, value: 3344 }, { year: 2016, value: 3605 }, { year: 2017, value: 3876 },
  { year: 2018, value: 3894 }, { year: 2019, value: 4135 }, { year: 2020, value: 3870 },
  { year: 2021, value: 4292 }, { year: 2022, value: 4783 }, { year: 2023, value: 4920 },
  { year: 2024, value: 4925 },
];

// Shares of GDP by industry, percent, 2024 (BPS).
export const GDP_SECTORS = [
  { sector: 'Manufacturing', share: 19.0 }, { sector: 'Wholesale & retail trade', share: 13.1 },
  { sector: 'Agriculture & fisheries', share: 12.6 }, { sector: 'Construction', share: 10.0 },
  { sector: 'Mining & quarrying', share: 9.0 }, { sector: 'Transport & warehousing', share: 6.4 },
  { sector: 'Information & communication', share: 4.2 }, { sector: 'Finance & insurance', share: 4.1 },
  { sector: 'Public administration', share: 3.3 }, { sector: 'All other industries', share: 18.3 },
];

// Foreign trade, US$ billion, 2024 (BPS).
export const TRADE_2024 = { exports: 264.7, imports: 233.7, balance: 31.0 };

// The ten most populous provinces: mid-2024 population (millions), capital city,
// and people per square kilometre (BPS figures, density rounded).
export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', population: 50.34, density: 1359 },
  { name: 'East Java', capital: 'Surabaya', population: 42.09, density: 880 },
  { name: 'Central Java', capital: 'Semarang', population: 38.28, density: 1115 },
  { name: 'North Sumatra', capital: 'Medan', population: 15.59, density: 214 },
  { name: 'Banten', capital: 'Serang', population: 12.43, density: 1286 },
  { name: 'Jakarta', capital: 'Jakarta', population: 10.56, density: 15900 },
  { name: 'South Sulawesi', capital: 'Makassar', population: 9.46, density: 203 },
  { name: 'Lampung', capital: 'Bandar Lampung', population: 9.42, density: 281 },
  { name: 'South Sumatra', capital: 'Palembang', population: 8.84, density: 97 },
  { name: 'Riau', capital: 'Pekanbaru', population: 6.73, density: 77 },
];
