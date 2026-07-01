const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cY8XMLBVz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec?action=stats";

fetch(API_URL)

.then(response => response.json())

.then(data => {

    document.getElementById("totalBookings").textContent =
        data.bookings;

    document.getElementById("totalHours").textContent =
        data.hours;

    document.getElementById("totalRevenue").textContent =
        data.revenue + " ريال";

    document.getElementById("topTeam").textContent =
        "-";

})

.catch(error => {

    console.log(error);

});
