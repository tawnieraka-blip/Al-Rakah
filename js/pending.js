const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cY8XMLBVz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec";

const container = document.getElementById("pendingContainer");

loadPendingBookings();

function loadPendingBookings() {

    fetch(API_URL + "?action=pending")

    .then(response => response.json())

    .then(data => {

        container.innerHTML = "";

        if (data.length === 0) {

            container.innerHTML = `
                <div class="booking-card">
                    <h3>🎉 لا توجد حجوزات معلقة</h3>
                </div>
            `;

            return;
        }

        data.forEach(row => {

            const card = document.createElement("div");

            card.className = "booking-card";

            card.innerHTML = `

                <h3>⚽ ${row[0]}</h3>

                <p>📅 ${row[1]}</p>

                <p>🗓 ${row[2]}</p>

                <p>🕒 البداية : ${row[3]}</p>

                <p>⏳ ${row[4]} ساعة</p>

                <p>💰 ${row[5]} ريال</p>

                <p style="color:#d68910;font-weight:bold;">
                    🟡 ${row[6]}
                </p>

                <button class="btn confirm-btn"
                    onclick="confirmBooking('${row[7]}')">

                    ✅ تأكيد الحضور

                </button>

            `;

            container.appendChild(card);

        });

    })

    .catch(error => {

        console.log(error);

    });

}



// =====================================
// تأكيد الحجز
// =====================================

function confirmBooking(id){

    fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            action:"confirm",

            id:id

        })

    })

    .then(response=>response.json())

    .then(result=>{

        alert(result.message);

        loadPendingBookings();

    });

}
