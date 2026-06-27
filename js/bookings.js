const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cY8XMLBVz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec";

const container = document.getElementById("bookingsContainer");

fetch(API_URL)
.then(res => res.json())
.then(data => {

    if(data.length === 0){
        container.innerHTML = `
        <div class="empty">
            لا توجد حجوزات حالياً
        </div>`;
        return;
    }

    data.forEach(row=>{

        const card = document.createElement("div");
        card.className = "booking-card";

        card.innerHTML = `
        <h3>${row[0]}</h3>

        <p>📅 ${row[1]}</p>

        <p>📆 ${row[2]}</p>

        <p>🕒 ${row[3]}</p>

        <p>⏳ ${row[4]} ساعات</p>

        <p>💰 ${row[5]} ريال</p>
        `;

        container.appendChild(card);

    });

});
