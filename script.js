window.onload = async function() {
    // 假设MemberStack脚本已正确加载并可用
    const memberstack = window.MemberStack.onReady; // 确保MemberStack脚本已准备好
    const member = await memberstack.getCurrentMember(); // 获取当前登录的会员信息

    // 获取显示用户名的元素
    var userNameDisplay = document.querySelector('[data-ms-member="first-name"]');

    if (member) {
        // 如果用户已登录，更新元素内容为用户的名字
        userNameDisplay.textContent = member['first-name'] || 'Current User';
    } else {
        // 如果用户未登录，显示默认文本
        userNameDisplay.textContent = 'Current User';
    }

    generateRandomUsers(9); // Generate fake user data
    sortTable(); // Sort the table
};

function generateRandomUsers(numUsers) {
    var firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"];
    var lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];
    var tableBody = document.getElementById("leaderboardBody");

    for (let i = 0; i < numUsers; i++) {
        var name = firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)];
        var coins = Math.floor(Math.random() * 100);

        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0); // Rank will be adjusted in sortTable
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell2.innerHTML = name;
        cell3.innerHTML = coins;
    }
}

function addCurrentUser(user) {
    var tableBody = document.getElementById("leaderboardBody");
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0); // Rank will be adjusted in sortTable
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell2.innerHTML = user.name;
    cell3.innerHTML = user.coins;
}

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("leaderboardTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
    // Adjust rank after sorting
    for (i = 1; i < rows.length; i++) {
        rows[i].getElementsByTagName("TD")[0].innerHTML = i;
    }
}
