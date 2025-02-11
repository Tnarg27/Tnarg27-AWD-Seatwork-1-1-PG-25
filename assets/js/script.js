// Load players from localStorage
let players = JSON.parse(localStorage.getItem("players"));

// If no players exist in localStorage, save the default players
if (!players) {
    players = [
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
    localStorage.setItem("players", JSON.stringify(players)); // Save default players
}


// Function to save players array to localStorage
function saveToLocalStorage() {
    localStorage.setItem("players", JSON.stringify(players));
}

// Select leaderboard table and sort dropdown
const leaderboardTable = document.querySelector("#leaderboard tbody");
const sortSelect = document.getElementById("sort");

// Function to render the leaderboard
function renderLeaderboard(players) {
    leaderboardTable.innerHTML = ""; // Clear existing table rows

    players.forEach((player,) => {
        const row = document.createElement("tr"); // Create a new table row
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.level}</td>
        `;
        leaderboardTable.appendChild(row); // Append the row to the table body
    });
}

// Function to sort players
function sortPlayers(criterion) {
    const sortedPlayers = [...players].sort((a, b) => {
        if (criterion === "score" || criterion === "level") {
            if (b[criterion] !== a[criterion]) {
                return b[criterion] - a[criterion]; // Sort descending
            }
        } else {
            return a[criterion].localeCompare(b[criterion]); // Sort alphabetically
        }
        return 0; // Keep original order if values are the same
    });

    renderLeaderboard(sortedPlayers);
}

// Initial render with default sorting by Name
sortPlayers("name");
sortSelect.value = "name"; // Set dropdown to "Name"

// Sort players when dropdown changes
sortSelect.addEventListener("change", (e) => {
    sortPlayers(e.target.value);
});

// Adding new player logic
const addPlayerBtn = document.getElementById("addPlayerBtn");
const playerForm = document.getElementById("playerForm");
const closeBtn = document.querySelector(".close");
const savePlayerBtn = document.getElementById("savePlayerBtn");

const playerNameInput = document.getElementById("playerName");
const playerScoreInput = document.getElementById("playerScore");
const playerLevelInput = document.getElementById("playerLevel");

// Show the modal when clicking "Add New Player"
addPlayerBtn.addEventListener("click", () => {
    playerForm.style.display = "flex";
});

// Close the modal when clicking the "X" button
closeBtn.addEventListener("click", () => {
    playerForm.style.display = "none";
});

// Function to add a new player and save to localStorage
savePlayerBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    const score = parseInt(playerScoreInput.value);
    const level = parseInt(playerLevelInput.value);

    if (name && !isNaN(score) && !isNaN(level)) {
        players.push({ name, score, level });
        saveToLocalStorage(); // Save updated list to localStorage
        sortPlayers(sortSelect.value); // Sort and update leaderboard
        playerForm.style.display = "none"; // Hide the form
        playerNameInput.value = "";
        playerScoreInput.value = "";
        playerLevelInput.value = "";
    } else {
        alert("Please enter valid player details.");
    }
});


// Deleting player logic
const deletePlayerBtn = document.getElementById("deletePlayerBtn");
const deletePlayerModal = document.getElementById("deletePlayerModal");
const closeDeleteModal = document.getElementById("closeDeleteModal");
const deletePlayerTable = document.querySelector("#deletePlayerTable tbody");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Open Delete Player Modal
deletePlayerBtn.addEventListener("click", () => {
    renderDeletePlayerList();
    deletePlayerModal.style.display = "flex";
});

// Close Delete Player Modal
closeDeleteModal.addEventListener("click", () => {
    deletePlayerModal.style.display = "none";
});

// Function to Render Players in Delete Modal
function renderDeletePlayerList() {
    deletePlayerTable.innerHTML = ""; // Clear table

    // Sort players alphabetically by name
    const sortedPlayers = [...players].sort((a, b) => a.name.localeCompare(b.name));

    sortedPlayers.forEach((player) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td>${player.level}</td>
            <td><button class="delete-btn" data-name="${player.name}">Delete</button></td>
        `;
        deletePlayerTable.appendChild(row);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            const playerName = e.target.getAttribute("data-name");
            deletePlayer(playerName);
        });
    });
}

// Function to Delete a Single Player
function deletePlayer(name) {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
        const index = players.findIndex(player => player.name === name);
        if (index !== -1) {
            players.splice(index, 1);
            saveToLocalStorage(); // Save changes
            renderDeletePlayerList(); // Refresh delete modal
            renderLeaderboard(players); // Refresh main leaderboard
        }
    }
}

// Function to Delete All Players
deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all players?")) {
        players.length = 0; // Empty the array
        saveToLocalStorage(); // Fix: Save to localStorage
        renderDeletePlayerList(); // Refresh delete modal table
        renderLeaderboard(players); // Refresh main leaderboard
        deletePlayerModal.style.display = "none"; // Close modal after deletion
    }
});

function savePlayers() {
    localStorage.setItem("players", JSON.stringify(players)); // Save to localStorage
}