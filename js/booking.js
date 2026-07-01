// =====================================================
// booking.js
// =====================================================

// رابط Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cY8XMLBVz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec";

// عناصر الصفحة
const team = document.getElementById("team");
const bookingDate = document.getElementById("bookingDate");
const checkIn = document.getElementById("checkIn");
const hours = document.getElementById("hours");
const amount = document.getElementById("amount");

// سعر الساعة
const PRICE_PER_HOUR = 150;

// =====================================
// حساب المبلغ تلقائياً
// =====================================

hours.addEventListener("input", calculateAmount);

function calculateAmount() {

    const totalHours = Number(hours.value);

    if (!totalHours) {
        amount.value = "";
        return;
    }

    amount.value = totalHours * PRICE_PER_HOUR;

}

// =====================================
// حفظ الحجز
// =====================================

function saveBooking() {

    if (
        team.value.trim() === "" ||
        bookingDate.value === "" ||
        checkIn.value === "" ||
        hours.value === ""
    ) {

        alert("يرجى إدخال جميع البيانات");
        return;

    }

    const day = new Date(bookingDate.value)
        .toLocaleDateString("ar-SA", {
            weekday: "long"
        });

    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            action: "add",

            team: team.value,

            bookingDate: bookingDate.value,

            day: day,

            checkIn: checkIn.value,

            hours: Number(hours.value),

            amount: Number(amount.value)

        })

    })

    .then(response => response.json())

    .then(result => {

        if (result.success) {

            alert("✅ تم حفظ الحجز بنجاح\nرقم الحجز: " + result.id);

            team.value = "";
            bookingDate.value = "";
            checkIn.value = "";
            hours.value = "";
            amount.value = "";

        } else {

            alert(result.message);

        }

    })

    .catch(error => {

        console.error(error);

        alert("حدث خطأ أثناء الاتصال بالسيرفر");

    });

}
