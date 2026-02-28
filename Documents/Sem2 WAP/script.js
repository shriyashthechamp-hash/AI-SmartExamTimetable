document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const status = document.getElementById('status');
    const gridEl = document.getElementById('grid');
    const controls = {
        up: document.getElementById('up'),
        down: document.getElementById('down'),
        left: document.getElementById('left'),
        right: document.getElementById('right')
    };

    let size = 3;
    let tomX = 0, tomY = 0;
    let jerryX = 2, jerryY = 1;
    let running = false;

    function updateStatus(msg) {
        status.textContent = msg;
    }

    function renderGrid() {
        gridEl.innerHTML = '';
        for (let i = 0; i < size; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < size; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (i === tomX && j === tomY) {
                    cell.classList.add('tom');
                    cell.textContent = 'Tom';
                }
                if (i === jerryX && j === jerryY) {
                    cell.classList.add('jerry');
                    cell.textContent = 'Jerry';
                }
                row.appendChild(cell);
            }
            gridEl.appendChild(row);
        }
    }

    function checkWin() {
        if (tomX === jerryX && tomY === jerryY) {
            updateStatus(`🎉 Tom found Jerry at (${tomX},${tomY})`);
            running = false;
            return true;
        }
        return false;
    }

    function moveTom(dir) {
        if (!running) return;
        if (dir === 'up' && tomX > 0) tomX--;
        else if (dir === 'down' && tomX < size - 1) tomX++;
        else if (dir === 'left' && tomY > 0) tomY--;
        else if (dir === 'right' && tomY < size - 1) tomY++;
        else {
            updateStatus('Invalid move');
            return;
        }
        renderGrid();
        if (!checkWin()) updateStatus(`Tom at (${tomX},${tomY})`);
    }

    startBtn.addEventListener('click', () => {
        size = 3; tomX = 0; tomY = 0; jerryX = 2; jerryY = 1; running = true;
        updateStatus('Game started — move Tom with the arrows or buttons');
        renderGrid();
    });

    controls.up.addEventListener('click', () => moveTom('up'));
    controls.down.addEventListener('click', () => moveTom('down'));
    controls.left.addEventListener('click', () => moveTom('left'));
    controls.right.addEventListener('click', () => moveTom('right'));

    document.addEventListener('keydown', (e) => {
        if (!running) return;
        if (e.key === 'ArrowUp') moveTom('up');
        if (e.key === 'ArrowDown') moveTom('down');
        if (e.key === 'ArrowLeft') moveTom('left');
        if (e.key === 'ArrowRight') moveTom('right');
    });

    // initial render
    renderGrid();
});

/* Minimal styles injected so grid is usable without external CSS */
const style = document.createElement('style');
style.textContent = `
  .grid { margin-top: 12px; }
  .row { display: flex; }
  .cell { width: 80px; height: 60px; border: 1px solid #ddd; display:flex;align-items:center;justify-content:center; }
  .tom { background: #3b82f6; color: white; }
  .jerry { background: #f59e0b; color: white; }
  .controls { margin-top: 8px; display:flex; gap:8px; align-items:center }
  #status { margin-top:8px; font-weight:600 }
`;
document.head.appendChild(style);
