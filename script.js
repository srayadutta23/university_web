const api = "http://localhost:3000/api/universities";

let allData = [];

async function fetchData() {
  const res = await fetch(api);
  allData = await res.json();
  display(allData);
}

function applyFilters() {
  let filtered = [...allData];

  const search = document.getElementById("search").value.toLowerCase();
  const rank = document.getElementById("rankFilter").value;
  const state = document.getElementById("stateFilter").value;
  const type = document.getElementById("typeFilter").value;
  const sort = document.getElementById("sortRank").value;

  // 🔍 Search
  if (search) {
    filtered = filtered.filter(u =>
      u.name.toLowerCase().includes(search)
    );
  }

  // 🏆 Rank Filter
  if (rank) {
    filtered = filtered.filter(u => u.rank <= rank);
  }

  // 📍 State Filter
  if (state) {
    filtered = filtered.filter(u => u.state === state);
  }

  // 🏫 Type Filter
  if (type) {
    filtered = filtered.filter(u => u.type === type);
  }

  // 🔽 Sort
  if (sort === "asc") {
    filtered.sort((a, b) => a.rank - b.rank);
  } else if (sort === "desc") {
    filtered.sort((a, b) => b.rank - a.rank);
  }

  display(filtered);
}

function display(data) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No universities found 😢</p>";
    return;
  }

  data.forEach(u => {
    container.innerHTML += `
      <div class="card">
        <h2>${u.name}</h2>
        <p>Rank: ${u.rank}</p>
        <p>State: ${u.state}</p>
        <p>Type: ${u.type}</p>
      </div>
    `;
  });
}

fetchData();