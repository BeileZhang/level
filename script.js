// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 假设当前用户等级为 "Gold"
    setCurrentLevel("Gold");
});

function setCurrentLevel(level) {
    const levels = document.querySelectorAll('.level');
    let found = false;
    levels.forEach((el, index) => {
        if (el.getAttribute('data-level') === level) {
            found = true;
            const indicator = document.getElementById('currentLevelIndicator');
            indicator.style.top = (el.offsetTop + el.offsetHeight / 2 - indicator.offsetHeight / 2) + 'px';
            indicator.style.left = '50%';
            indicator.innerText = `You are here! (${level})`;
        }
    });
    if (!found) {
        console.log("Level not found");
    }
}
