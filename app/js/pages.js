// pages.js — one render function per section of the site. Each returns the
// HTML for <main>; main.js swaps it in on hash changes.

import {
  AGE_PYRAMID, GDP_GROWTH, GDP_PER_CAPITA, GDP_SECTORS, INFLATION, ISLAND_DENSITY,
  KPI_CARDS, POPULATION_HISTORY, PROVINCES, SOURCE_NOTE, TRADE_2024,
} from './data.js';
import { barChart, donutChart, hbarChart, lineChart, pyramidChart } from './charts.js';
import { provinceTable } from './table.js';

function sourceLine(extra = '') {
  return `<p class="source-note">${SOURCE_NOTE}${extra}</p>`;
}

function chartCard(title, blurb, chart, source) {
  return `<section class="card chart-card"><h3>${title}</h3><p class="card-blurb">${blurb}</p>${chart}${sourceLine(source)}</section>`;
}

export function overviewPage() {
  const kpis = KPI_CARDS.map((k) => `
    <article class="kpi-card">
      <p class="kpi-label">${k.label}</p>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-year">${k.year}</p>
      <p class="kpi-note">${k.note}</p>
    </article>`).join('');
  return `
    <section class="hero">
      <h1>Indonesia, in official numbers</h1>
      <p class="lede">284 million people, a US$1.4 trillion economy and 38 provinces — explored through the
      figures Indonesia itself publishes. Every number below comes from BPS, the national statistics office,
      and every chart names its year.</p>
    </section>
    <section class="kpi-grid" aria-label="Headline indicators">${kpis}</section>
    <div class="card-grid">
      ${chartCard('Economic growth, 2015–2024',
        'A decade of growth near five percent, interrupted by the pandemic contraction of 2020 and back to trend since.',
        lineChart(GDP_GROWTH, { label: 'GDP growth 2015 to 2024, percent', color: '#b3352c' }),
        ', GDP growth by year.')}
      ${chartCard('Inflation, 2015–2024',
        'Price rises stayed inside the central bank\u2019s target band for most of the decade; the 2022 spike followed global fuel and food prices.',
        lineChart(INFLATION, { label: 'Inflation 2015 to 2024, percent', color: '#0f766e' }),
        ', consumer price index, December year on year.')}
    </div>
    <section class="card">
      <h3>Where to go next</h3>
      <ul class="next-links">
        <li><a href="#/population">Population</a> — how Indonesia grew from 119 million in 1971 to 284 million today, and who lives where.</li>
        <li><a href="#/economy">Economy</a> — what the economy makes, sector by sector, and what it sells to the world.</li>
        <li><a href="#/regions">Regions</a> — the ten largest provinces in a table you can sort and search.</li>
      </ul>
    </section>`;
}

export function populationPage() {
  const history = POPULATION_HISTORY.map((d) => ({ label: String(d.year), value: d.value }));
  const density = ISLAND_DENSITY.map((d) => ({ label: d.island, value: d.density }));
  return `
    <section class="hero">
      <h1>Population</h1>
      <p class="lede">Indonesia counted 270.2 million people in the 2020 census and estimates 284.4 million
      in mid-2025. More than half — about 56 percent — live on Java, the most crowded large island on earth.</p>
    </section>
    <div class="card-grid">
      ${chartCard('Population at each census, 1971–2025',
        'Every census since independence has added roughly thirty million people; the 2025 point is the official mid-year estimate.',
        barChart(history, { label: 'Population by census year, millions', color: '#34558b' }),
        ', population censuses and the 2025 mid-year estimate. Figures in millions.')}
      ${chartCard('Who lives here: the 2024 age pyramid',
        'Each bar is a five-year age group\u2019s share of the population. The wide base is narrowing: Indonesia\u2019s median age is now about 30.',
        pyramidChart(AGE_PYRAMID, { label: 'Population pyramid 2024, percent of population' }),
        ', population structure by age and sex, 2024. Shares in percent.')}
    </div>
    ${chartCard('People per square kilometre, by island, 2024',
      'Java holds about 1,180 people per square kilometre; Papua, at the other end of the archipelago, holds about 15. The national average is near 148.',
      hbarChart(density, { label: 'Population density by island, people per square kilometre' }),
      ', population density by island group, 2024, rounded.')}
    <section class="card">
      <h3>Three facts the charts rest on</h3>
      <ul class="fact-list">
        <li><strong>284.4 million</strong> people at mid-2025 — the fourth largest population in the world.</li>
        <li><strong>2.1 children per woman</strong> — the fertility rate is close to replacement level, down from 5.6 in 1971.</li>
        <li><strong>58 percent urban</strong> — most Indonesians now live in towns and cities, against 17 percent in 1971.</li>
      </ul>
      ${sourceLine(', population census 2020 and demographic indicators.')}
    </section>`;
}

export function economyPage() {
  const trade = TRADE_2024;
  return `
    <section class="hero">
      <h1>Economy</h1>
      <p class="lede">Indonesia\u2019s GDP reached about US$1.40 trillion in 2024, growing 5.03 percent.
      Manufacturing is the single largest industry, and the country has run a trade surplus since 2020.</p>
    </section>
    <div class="card-grid">
      ${chartCard('GDP per person, 2015–2024',
        'Income per head, in current US dollars, rose from about $3,340 to about $4,930 across the decade, dipping only in 2020.',
        lineChart(GDP_PER_CAPITA, { label: 'GDP per capita 2015 to 2024, US dollars', color: '#c08a1e' }),
        ' / World Bank series, GDP per capita in current US dollars, rounded.')}
      ${chartCard('What the economy makes, 2024',
        'No single industry dominates: the largest, manufacturing, is under a fifth of GDP, and services together make up the biggest share.',
        donutChart(GDP_SECTORS, { label: 'GDP by industry 2024, percent' }),
        ', GDP at current prices by industry, 2024.')}
    </div>
    <section class="card">
      <h3>Foreign trade, 2024</h3>
      <div class="trade-row">
        <div class="trade-cell"><p class="trade-label">Exports</p><p class="trade-value">US$${trade.exports} bn</p><p class="trade-note">Coal, palm oil, iron and steel, and electrical machinery lead the list.</p></div>
        <div class="trade-cell"><p class="trade-label">Imports</p><p class="trade-value">US$${trade.imports} bn</p><p class="trade-note">Machinery, fuel and chemicals are the biggest purchases.</p></div>
        <div class="trade-cell"><p class="trade-label">Trade surplus</p><p class="trade-value">US$${trade.balance} bn</p><p class="trade-note">A surplus every year since 2020.</p></div>
      </div>
      ${sourceLine(', foreign trade statistics, 2024.')}
    </section>
    <section class="card">
      <h3>Work, in February 2025</h3>
      <ul class="fact-list">
        <li><strong>4.76%</strong> open unemployment — 7.3 million people looking for work.</li>
        <li><strong>145.8 million</strong> people in the labour force, of whom 138.5 million were working.</li>
        <li><strong>About 58%</strong> of workers are in informal work — own-account, casual or unpaid family work.</li>
      </ul>
      ${sourceLine(', National Labour Force Survey (Sakernas), February 2025.')}
    </section>`;
}

export function regionsPage() {
  return `
    <section class="hero">
      <h1>Regions: the ten largest provinces</h1>
      <p class="lede">Indonesia has 38 provinces. The ten in this table hold about 213 million people —
      three quarters of the country. Click a column heading to sort the table, or search by province or capital.</p>
    </section>
    <section class="card">
      ${provinceTable(PROVINCES)}
      ${sourceLine(', mid-2024 population estimates; density rounded.')}
    </section>
    <section class="card">
      <h3>Reading the table</h3>
      <p>West Java alone has more people than Spain. Jakarta is by far the densest province — a city-province
      of ten and a half million people in 664 square kilometres — while South Sumatra, nearly as populous as
      South Sulawesi, spreads its people over fourteen times Jakarta\u2019s area per person. The three Javanese
      provinces at the top of the table are why Java, with 7 percent of the land, holds 56 percent of the people.</p>
      ${sourceLine('.')}
    </section>`;
}

export function aboutPage() {
  return `
    <section class="hero">
      <h1>About the data</h1>
      <p class="lede">Where every figure on this site comes from, and how far to trust it.</p>
    </section>
    <section class="card prose">
      <h3>The source: BPS — Statistics Indonesia</h3>
      <p>BPS (Badan Pusat Statistik) is Indonesia\u2019s national statistics office. It runs the population
      census every ten years, the national labour force survey (Sakernas) twice a year, and the household
      surveys behind the poverty and inflation figures. National accounts — GDP, growth and the industry
      shares on the Economy page — are compiled by BPS from its own surveys and administrative records.</p>
      <h3>Years and rounding</h3>
      <p>Each chart, card and table on this site names the year of its figures. Where a chart needs a short
      label, figures are rounded — densities to whole people per square kilometre, GDP per head to the
      nearest dollar, population to a tenth of a million — and the text says so. Rounding never changes a
      figure\u2019s meaning: 284.4 million is the published mid-2025 estimate, not a guess.</p>
      <h3>What is an estimate?</h3>
      <p>Between censuses, BPS projects the population forward from the last census using births, deaths and
      migration. The 2025 population is such an estimate; it will be replaced by a count at the 2030 census.
      GDP figures are revised as fuller data arrives, so the 2024 growth of 5.03 percent is the figure BPS
      published in February 2025.</p>
      <h3>About this site</h3>
      <p>NUSANTARA IN NUMBERS is an independent explorer built to make Indonesia\u2019s official statistics
      easy to browse. It is not a BPS website and speaks for no one; it republishes BPS figures with their
      years attached so a reader can always check a number against the original release.</p>
    </section>`;
}
