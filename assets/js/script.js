// Array of player objects with name, score, and level properties
const players = [
    { name: "Bob", score: 300, level: 3 },
    { name: "Ivan", score: 320, level: 3 },
    { name: "Alice", score: 450, level: 5 },
    { name: "Heidi", score: 400, level: 5 },
    { name: "Eve", score: 200, level: 2 },
    { name: "Charlie", score: 500, level: 6 },
    { name: "Dave", score: 600, level: 7 },
    { name: "Judy", score: 450, level: 5 },
    { name: "Grace", score: 350, level: 4 },
    { name: "Frank", score: 550, level: 6 }
];

// Add index to each player to track their original input order
const playersWithIndex = players.map((player, index) => ({ ...player, index }));

// Select the leaderboard table body and the sort dropdown element
const leaderboardTable = document.querySelector("#leaderboard tbody");
const sortSelect = document.getElementById("sort");

// Function to render the leaderboard by generating table rows for each player
function renderLeaderboard(players) {
    leaderboardTable.innerHTML = ""; // Clear existing table rows

    // Loop through the players and create a row for each player
    players.forEach((player) => {
        const row = document.createElement("tr"); // Create a new table row
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.level}</td>
        `;
        leaderboardTable.appendChild(row); // Append the row to the table body
    });
}

// Function to sort players based on the selected criterion (score, level, or name)
function sortPlayers(criterion) {
    // Make a shallow copy of the players array to avoid modifying the original array
    const sortedPlayers = [...players].sort((a, b) => {
      // Sort based on the selected criterion (score or level)
      if (criterion === "score" || criterion === "level") {
        if (b[criterion] !== a[criterion]) {
            return b[criterion] - a[criterion]; // Sort by descending score/level
        }
    } else {
        return a[criterion].localeCompare(b[criterion]); // Sort by name alphabetically
    }

    // If scores or levels are equal, sort by original input order (index) 
    return a.index - b.index; 
    });

    // Render the leaderboard with the sorted players
    renderLeaderboard(sortedPlayers);
}

// Initial render of the leaderboard (unsorted)
renderLeaderboard(players);

//Sort players when dropdown changes
sortSelect.addEventListener("change", (e) => {
    sortPlayers(e.target.value);
});
