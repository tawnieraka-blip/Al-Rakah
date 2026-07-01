const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cY8XMLBVz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec?status=معلق";
const container = document.getElementById("pendingContainer");

fetch(API_URL)
.then(response => response.json())
.then(data => {

    if (data.length === 0){

        container.innerHTML = `
            <div class="booking-card">
                <h3>🎉 لا توجد حجوزات معلقة</h3>
            </div>
        `;

        return;
    }

    data.forEach(row=>{

        const card=document.createElement("div");

        card.className="booking-card";

        card.innerHTML=`

            <h3>⚽ ${row[0]}</h3>

            <p>📅 ${row[1]}</p>

            <p>🗓 ${row[2]}</p>

            <p>🕒 البداية : ${row[3]}</p>

            <p>⏳ ${row[4]} ساعة</p>

            <p>💰 ${row[5]} ريال</p>

            <p style="color:#d68910;font-weight:bold;">
                🟡 ${row[6]}
            </p>

            <button class="btn confirm-btn">
                ✅ تأكيد الحضور
            </button>

        `;

        container.appendChild(card);

    });

})
.catch(error=>{

    console.log(error);

});
