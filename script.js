const drawnNumbers = [];
const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

function drawNextNumber() {
    if (drawnNumbers.length >= 90) return alert("Game Over!");
    let available = allNumbers.filter(n => !drawnNumbers.includes(n));
    let drawn = available[Math.floor(Math.random() * available.length)];
    drawnNumbers.push(drawn);
    
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Number ${drawn}`));
    document.getElementById("current-number").innerText = drawn;
    document.getElementById(`cell-${drawn}`).classList.add("called");
}

function generateTambolaTicket() {
    let ticket = Array.from({ length: 3 }, () => Array(9).fill(0));
    let columns = [];
    for (let i = 0; i < 9; i++) {
        let min = i * 10 + 1, max = (i === 8) ? 90 : (i + 1) * 10, pool = [];
        for (let n = min; n <= max; n++) pool.push(n);
        pool.sort(() => Math.random() - 0.5);
        columns.push(pool.slice(0, 3).sort((a, b) => a - b));
    }
    for (let row = 0; row < 3; row++) {
        let placed = [];
        while (placed.length < 5) {
            let col = Math.floor(Math.random() * 9);
            if (!placed.includes(col) && columns[col].length > 0) placed.push(col);
        }
        placed.forEach(col => ticket[row][col] = columns[col].pop());
    }
    return ticket;
}

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    for (let i = 1; i <= 90; i++) {
        let cell = document.createElement("div");
        cell.id = `cell-${i}`;
        cell.className = "board-cell";
        cell.innerText = i;
        board.appendChild(cell);
    }
    const ticket = generateTambolaTicket();
    const container = document.getElementById("ticket");
    ticket.forEach(row => {
        row.forEach(val => {
            let cell = document.createElement("div");
            cell.className = "ticket-cell";
            if (val !== 0) {
                cell.innerText = val;
                cell.addEventListener("click", () => cell.classList.toggle("marked"));
            }
            container.appendChild(cell);
        });
    });
});
