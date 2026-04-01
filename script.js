let data = [];

fetch('data/universities.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    display(data);
  });

function display(universities) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  universities.forEach(u => {
    container.innerHTML += `
      <div class="card">
        <h2>${u.name}</h2>
        <p>Rank: ${u.rank}</p>
        <p>State: ${u.state}</p>
        <p>Acceptance Rate: ${u.acceptance_rate}</p>
      </div>
    `;
  });
}

document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const filtered = data.filter(u =>
    u.name.toLowerCase().includes(value)
  );
  display(filtered);
});