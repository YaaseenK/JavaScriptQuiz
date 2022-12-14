const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const recentScore = localStorage.getItem('recentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores)

localStorage.setItem('highScores', JSON.stringify([]));

finalScore.innerText = recentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});
saveHighScore = (e) => {
    e.preventDefault();
    
    const score = {
        score: recentScore,
        name: username.value
    };
    highScores.push(score);
    console.log(highScores);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores' , JSON.stringify(highScores));
    window.location.assign('../pages/highScore.html')
}