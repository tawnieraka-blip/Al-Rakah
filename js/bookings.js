const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cY8XMLBVz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec";

const container = document.getElementById("bookingsContainer");

fetch(API_URL)
.then(response => response.json())
.then(data => {

    if (data.length === 0) {
        container.innerHTML = `
            <div class="booking-card">
                <h3>لا توجد حجوزات</h3>
                <p>لم يتم إضافة أي حجز حتى الآن.</p>
            </div>
        `;
        return;
    }

    data.forEach(row => {

        const card = document.createElement("div");
        card.className = "booking-card";

       card.innerHTML = `
    <h3>${row[1]}</h3>

    <p>📅 <strong>التاريخ:</strong> ${row[2]}</p>

    <p>📆 <strong>اليوم:</strong> ${row[3]}</p>

    <p>🕒 <strong>وقت الدخول:</strong> ${row[4]}</p>

    <p>⏳ <strong>عدد الساعات:</strong> ${row[5]}</p>

    <p>💰 <strong>المبلغ:</strong> ${row[6]} ريال</p>

    <br>

  <div style="margin-top:15px;">
    <button onclick="deleteBooking(${row[0]})">
        🗑 حذف
    </button>
</div>
`;

        container.appendChild(card);

    });

})
.catch(error => {

    container.innerHTML = `
        <div class="booking-card">
            <h3>حدث خطأ</h3>
            <p>تعذر تحميل الحجوزات.</p>
        </div>
    `;

    console.log(error);

});

function deleteBooking(row) {

    if (!confirm("هل أنت متأكد من حذف هذا الحجز؟")) {
        return;
    }

    alert("تم اختيار الصف رقم: " + row);

}
