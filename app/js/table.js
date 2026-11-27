// table.js — the provinces table: click a header to sort by that column,
// type in the search box to filter rows by province or capital name.

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

const COLUMNS = [
  { key: 'name', label: 'Province', numeric: false },
  { key: 'capital', label: 'Capital', numeric: false },
  { key: 'population', label: 'Population (millions)', numeric: true },
  { key: 'density', label: 'People per km²', numeric: true },
];

// Renders the full table block (search box + table) for the given rows.
export function provinceTable(rows) {
  const head = COLUMNS.map((c) => `<th scope="col"><button type="button" class="sort-btn" data-sort="${c.key}" aria-label="Sort by ${c.label}">${c.label} <span class="sort-mark" data-mark="${c.key}"></span></button></th>`).join('');
  return `
    <div class="table-tools">
      <label class="search-label" for="province-search">Search provinces or capitals</label>
      <input id="province-search" type="search" placeholder="Try &quot;Java&quot; or &quot;Medan&quot;" autocomplete="off">
      <p class="table-count" id="province-count" role="status"></p>
    </div>
    <div class="table-scroll">
      <table class="data-table" id="province-table">
        <thead><tr>${head}</tr></thead>
        <tbody></tbody>
      </table>
    </div>`;
}

// Wires sorting and searching after provinceTable's HTML is in the page.
export function wireProvinceTable(rows) {
  const tbody = document.querySelector('#province-table tbody');
  const input = document.querySelector('#province-search');
  const count = document.querySelector('#province-count');
  if (!tbody || !input || !count) return;
  const state = { key: 'population', dir: -1, query: '' };

  function visibleRows() {
    const q = state.query.trim().toLowerCase();
    const filtered = rows.filter((r) => !q || r.name.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q));
    const col = COLUMNS.find((c) => c.key === state.key);
    return filtered.sort((a, b) => {
      const av = a[state.key];
      const bv = b[state.key];
      const cmp = col.numeric ? av - bv : String(av).localeCompare(String(bv));
      return cmp * state.dir;
    });
  }

  function render() {
    const list = visibleRows();
    tbody.innerHTML = list.length
      ? list.map((r) => `<tr><td>${esc(r.name)}</td><td>${esc(r.capital)}</td><td class="num">${r.population.toFixed(2)}</td><td class="num">${r.density.toLocaleString('en-US')}</td></tr>`).join('')
      : '<tr><td colspan="4" class="no-rows">No province matches that search.</td></tr>';
    count.textContent = `Showing ${list.length} of ${rows.length} provinces`;
    document.querySelectorAll('.sort-mark').forEach((mark) => {
      mark.textContent = mark.dataset.mark === state.key ? (state.dir === 1 ? '▲' : '▼') : '';
    });
  }

  document.querySelectorAll('.sort-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (state.key === key) {
        state.dir = -state.dir;
      } else {
        state.key = key;
        state.dir = COLUMNS.find((c) => c.key === key).numeric ? -1 : 1;
      }
      render();
    });
  });
  input.addEventListener('input', () => {
    state.query = input.value;
    render();
  });
  render();
}
