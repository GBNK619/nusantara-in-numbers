// main.js — hash routing and boot. The route is the part of the location
// hash after "#/"; unknown routes fall back to the overview.

import { aboutPage, economyPage, overviewPage, populationPage, regionsPage } from './pages.js';
import { PROVINCES } from './data.js';
import { wireProvinceTable } from './table.js';

const ROUTES = {
  overview: { title: 'Overview', render: overviewPage },
  population: { title: 'Population', render: populationPage },
  economy: { title: 'Economy', render: economyPage },
  regions: { title: 'Regions', render: regionsPage },
  about: { title: 'About the data', render: aboutPage },
};

function currentRoute() {
  const name = window.location.hash.replace(/^#\/?/, '').split(/[?#]/)[0];
  return Object.prototype.hasOwnProperty.call(ROUTES, name) ? name : 'overview';
}

function render() {
  const name = currentRoute();
  const route = ROUTES[name];
  const main = document.querySelector('#page');
  main.innerHTML = route.render();
  document.title = `${route.title} — NUSANTARA IN NUMBERS`;
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const active = a.dataset.route === name;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  if (name === 'regions') wireProvinceTable(PROVINCES);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
