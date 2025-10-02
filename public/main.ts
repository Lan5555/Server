let numberOfGames: number = 0;
const dashboard = document.querySelector('.dashboard') as HTMLElement;
const activityLog = document.querySelector('.activity-log') as HTMLElement;
const Reward = document.querySelector('.rewards') as HTMLElement;
const games = ['Word chain','Treasure Hunt'];
const logs:string[] = [];
let username:any = '';


window.onload = async () => {
  await fetchAvailableGames();
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  username = name;
  dashboard.innerHTML = '';  // Clear existing cards before adding new ones
  for (let i = 0; i < numberOfGames; i++) {
    const card = `
  <div class="available-triva">
    <div class="trivia-card">
      <img src="https://picsum.photos/400/200?random=${i}" alt="General Knowledge">
      <h3>🎯 ${games[i]}</h3>
      <p>Players: ${0}</p>
      <button onclick= "runGame(${i})">Join Game</button>
    </div>
  </div>
`;
    dashboard.innerHTML += card;
  }
 displayBoxes();
}

function runGame(index:any){
  switch(index){
    case 0:
      window.location.href = `/games/word.html?name=${encodeURIComponent(username)}`;
      break;
    case 1:
      window.location.href = `/games/treasure-hunt.html?name=${encodeURIComponent(username)}`;

      break;
  }
}

async function displayBoxes(){
    await getLogs();
    dashboard.innerHTML += `
    <!-- Activity Log -->
    <div class="activity-log">
      <h4>📝 Recent Activity</h4>
      <ul>
        ${logs.map((value) => `<li>${value}</li>`).join("")}
      </ul>
    </div>

    <!-- Rewards Section -->
    <div class="rewards">
      <h4>🏆 Level Up Rewards</h4>
      <div class="level-circle">Lv 5</div>
      <p>Keep playing to unlock new rewards and achievements!</p>
      <button class="reward-btn"><i class="fa-solid fa-gift"></i> Claim Reward</button>
    </div>
    `;
}



async function fetchAvailableGames() {
  try {
    const res = await fetch('/api/get-available-games');
    const data = await res.json();

    // Make sure the field exists and is a number
    if (typeof data.data.data === 'number') {
      numberOfGames = data.data.data;
    } else {
      throw new Error('Invalid data format');
    }

  } catch (e:any) {
    alert('Failed to fetch games: ' + e.message);
  }
}


async function getLogs() {
  try {
    const res = await fetch('/api/logs');
    const data = await res.json();
    logs.splice(0, logs.length, ...data.log); // replace with fresh logs
  } catch (e:any) {
    alert('Failed to fetch games: ' + e.message);
  }
}


