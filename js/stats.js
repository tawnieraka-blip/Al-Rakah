const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cY8XMLBVz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec";

fetch(API_URL)
.then(response => response.json())
.then(data => {

    document.getElementById("totalBookings").textContent = data.length;

    let totalHours = 0;
    let totalRevenue = 0;
    let teams = {};

    data.forEach(row => {

        totalHours += Number(row[4]);
        totalRevenue += Number(row[5]);

        const team = row[0];

        if (teams[team]) {
            teams[team]++;
        } else {
            teams[team] = 1;
        }

    });

    document.getElementById("totalHours").textContent = totalHours;

    document.getElementById("totalRevenue").textContent =
        totalRevenue + " ريال";

    let topTeam = "-";
    let max = 0;

    for (let team in teams) {
        if (teams[team] > max) {
            max = teams[team];
            topTeam = team;
        }
    }

    document.getElementById("topTeam").textContent = topTeam;

})
.catch(error => {

    console.log(error);

});
