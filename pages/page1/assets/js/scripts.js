// Array of player objects with name, score, and level
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

// Sort players by score in descending order for the chart
const sortedPlayers = players.sort((a, b) => b.score - a.score);

// Generate Bar Chart Manually
const chartContainer = document.getElementById("barChart"); // Get the chart container element by ID
const maxScore = Math.max(...players.map(p => p.score)); // Find the highest score from all players

// Iterate over each player to generate the corresponding bar for the chart
sortedPlayers.forEach(player => {
    let bar = document.createElement("div"); // Create a new div element for each bar
    bar.classList.add("bar"); // Add 'bar' class to style the bar
    bar.style.height = (player.score / maxScore) * 100 + "%"; // Set the height of the bar proportional to the score
    bar.innerText = player.score; // Display the player's score inside the bar
    chartContainer.appendChild(bar); // Append the bar to the chart container
});

// Display top 3 players
const topPlayers = sortedPlayers.slice(0, 3); // Get the first 3 players (top players by score)
const topPlayerElement = document.getElementById("topPlayer"); // Get the element to display top players

// Render the top players list as an unordered list with each player's name and score
topPlayerElement.innerHTML = `
    <ul>
        ${topPlayers.map(player => `<li>🏆 ${player.name} - ${player.score} Points</li>`).join('')}
    </ul>
`;

// Calculate Averages
const avgScore = (players.reduce((sum, p) => sum + p.score, 0) / players.length).toFixed(2); // Average score
const avgLevel = (players.reduce((sum, p) => sum + p.level, 0) / players.length).toFixed(2); // Average level

// Display the calculated averages in the "averages" section
document.getElementById("averages").innerHTML = `<b>Average Score: ${avgScore}</b><br><b>Average Level: ${avgLevel}</b>`;