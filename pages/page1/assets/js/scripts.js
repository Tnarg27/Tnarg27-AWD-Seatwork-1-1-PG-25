// Retrieve player data from localStorage
let players = JSON.parse(localStorage.getItem("players")) || [];

// Only proceed if players exist
if (players.length > 0) {
    // Sort players by score in descending order
    const sortedPlayers = players.sort((a, b) => b.score - a.score);

    // Generate Bar Chart
    const chartContainer = document.getElementById("barChart");
    const maxScore = Math.max(...players.map(p => p.score));

    chartContainer.innerHTML = ""; // Clear previous data
    sortedPlayers.forEach(player => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = (player.score / maxScore) * 100 + "%";
        bar.innerText = player.score;
        chartContainer.appendChild(bar);
    });

    // Display top 3 players
    const topPlayers = sortedPlayers.slice(0, 3);
    document.getElementById("topPlayer").innerHTML = `
        <ul>
            ${topPlayers.map(player => `<li>🏆 ${player.name} - ${player.score} Points</li>`).join('')}
        </ul>
    `;

    // Calculate Averages
    const avgScore = (players.reduce((sum, p) => sum + p.score, 0) / players.length).toFixed(2);
    const avgLevel = (players.reduce((sum, p) => sum + p.level, 0) / players.length).toFixed(2);

    document.getElementById("averages").innerHTML = `<b>Average Score: ${avgScore}</b><br><b>Average Level: ${avgLevel}</b>`;
} else {
    // If no data is available, show a message
    document.getElementById("barChart").innerHTML = "<p>No data available</p>";
    document.getElementById("topPlayer").innerText = "No players yet.";
    document.getElementById("averages").innerText = "No statistics available.";
}