// script.js
const folderInput = document.getElementById("folderInput");
const resultsBody = document.getElementById("resultsBody");

const categories = [
  { name: "CPI Dandeli", patterns: ["CPI Dandeli", "All CPI"] },
  { name: "CPI Haliyal", patterns: ["CPI Haliyal", "All CPI"] },
  { name: "CPI Joida", patterns: ["CPI Joida", "All CPI"] },
  { name: "TOWN", patterns: ["PSI DTPS", "PSI DANDELI TOWN", "DANDELI TOWN", "All PS"] },
  { name: "RURAL", patterns: ["PSI DRPS", "PSI DANDELI RURAL", "DANDELI RURAL", "All PS"] },
  { name: "HALIYAL", patterns: ["PSI HLY", "PSI HALIYAL", "HALIYAL", "All PS"] },
  { name: "AMBIKANAGAR", patterns: ["PSI AMGA", "PSI AMBIKANAGAR", "AMBIKANAGAR", "All PS"] },
  { name: "JOIDA", patterns: ["PSI JOIDA", "JOIDA", "All PS"] },
  { name: "RAMANAGAR", patterns: ["PSI RMN", "PSI RAMANAGAR", "RAMANAGAR", "All PS"] }
];

const customOrder = [
  "CPI Dandeli",
  "CPI Haliyal",
  "CPI Joida",
  "TOWN",
  "RURAL",
  "HALIYAL",
  "AMBIKANAGAR",
  "JOIDA",
  "RAMANAGAR"
];

folderInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  const filenames = files.map(file => file.name);
  analyzeFiles(filenames);
});

function analyzeFiles(filenames) {
  const categoryCounts = {};
  const matchedIndexes = new Set();

  filenames.forEach((filename, index) => {
    let matched = false;
    for (const cat of categories) {
      for (const pattern of cat.patterns) {
        if (filename.toUpperCase().includes(pattern.toUpperCase())) {
          categoryCounts[cat.name] = (categoryCounts[cat.name] || 0) + 1;
          matched = true;
          matchedIndexes.add(index);
          break;
        }
      }
      if (matched) break;
    }
  });

  const unnamedCount = filenames.length - matchedIndexes.size;
  const totalCategoryMatches = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  const actualTotal = filenames.length;

  renderResults(categoryCounts, unnamedCount, totalCategoryMatches, actualTotal);
}

function renderResults(categoryCounts, unnamedCount, totalMatches, actualTotal) {
  resultsBody.innerHTML = "";

  const sortedEntries = Object.entries(categoryCounts).sort((a, b) => {
    const i1 = customOrder.indexOf(a[0]);
    const i2 = customOrder.indexOf(b[0]);
    return (i1 === -1 ? 999 : i1) - (i2 === -1 ? 999 : i2);
  });

  for (const [category, count] of sortedEntries) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${category}</td><td>${count}</td>`;
    resultsBody.appendChild(row);
  }

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td class="total-match">TotalCategoryMatches</td><td class="total-match">${totalMatches}</td>`;
  resultsBody.appendChild(totalRow);

  const unnamedRow = document.createElement("tr");
  unnamedRow.innerHTML = `<td class="unnamed">UnNamed</td><td class="unnamed">${unnamedCount}</td>`;
  resultsBody.appendChild(unnamedRow);

  const actualRow = document.createElement("tr");
  actualRow.innerHTML = `<td class="actual-total">ActualTotalFiles</td><td class="actual-total">${actualTotal}</td>`;
  resultsBody.appendChild(actualRow);
}
