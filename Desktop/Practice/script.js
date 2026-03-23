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


    renderGrid();
});

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



let btn1 = document.getElementById("btn_chakka")
btn1.addEventListener("click", function() {
    let user  = prompt("Choose something from Rock Paper or Scissors")
    bro(user)
});
let score = 0;
const scoreEl = document.querySelector('.score');

function updateScore(amount = 1) {
    score += amount;
    if (scoreEl) scoreEl.textContent = score;
}

function bro(user){
    let comp = Math.random();
    let move = "";
    if (comp < 0.34){
        move = "rock";
    }
    else if (comp <= 0.64){
        move = "paper";
    }
    else{
        move = "scissors";
    }
    if (move == user){
        alert("Less gooo draw hai bhaiiii !!");
    }
    else if (user == "rock" && move == "scissors"){
        
        alert("Jeet gye baby");
        updateScore();
        var count = 200;
        var defaults = {
        origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
        }

        fire(0.25, {
        spread: 26,
        startVelocity: 55,
        });
        fire(0.2, {
        spread: 60,
        });
        fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
        });
        fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
        });
        fire(0.1, {
        spread: 120,
        startVelocity: 45,
        });


    }
    else if(user == "paper" && move == "rock"){
        alert("Yayyy jeet gaye");
        updateScore();
        var count = 200;
        var defaults = {
        origin: { y: 0.7 }
        };

    function fire(particleRatio, opts) {
    confetti({

    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
    });
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });
    fire(0.2, {
    spread: 60,
    });
    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
    });
    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
    }
    else if(user == "scissors" && move == "paper"){
        alert("Lesss go bahiiii jeet gye");
        updateScore();
        var count = 200;
        var defaults = {
        origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
        }

        fire(0.25, {
        spread: 26,
        startVelocity: 55,
        });
        fire(0.2, {
        spread: 60,
        });
        fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
        });
        fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
        });
        fire(0.1, {
        spread: 120,
        startVelocity: 45,
        });
    }
    else{
        alert("Shit Yrr Haar gya mein tohhh")
    }


}





let obj = {
    names :"Messi",
    age: 38,
    country: "Argentina",
    isGoat: true,
    clubs: ["barca" , "psg" ,"miami"],
    isretired: null,
    greet: function(){
        console.log("Hi")
    }
    

}
let inp = document.getElementById("add");
let kaam = document.getElementsByClassName("aaj_ke_kaam")[0];
let task_btn = document.getElementsByClassName("task_btn")[0];

task_btn.addEventListener("click", () => {
    let taskText = inp.value;

    if (taskText === "") return;
    let kaam_kar_bhadwe = document.createElement("div");
    kaam_kar_bhadwe.className = "task";

    kaam_kar_bhadwe.innerHTML = `
        <input type="checkbox" class="check">
        <span class="task-text">${taskText}</span>
    `;

    kaam.appendChild(kaam_kar_bhadwe);

    inp.value = "";
});

let deleteButtons = document.getElementsByClassName("delete");


let vada = new Promise(() => {})
console.log(vada)