// ===============================
// إعدادات النظام
// ===============================

const API_URL = "https://script.google.com/macros/s/AKfycbw9qpPSjaZs3JX5BXLqElB7hOnbr8Ro7crCA-V0XMoSjffvfMdsTdfTcZbRKP2fpCVwYg/exec";

const team = document.getElementById("team");
const bookingDate = document.getElementById("bookingDate");

const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");

const hourPrice = document.getElementById("hourPrice");
const discount = document.getElementById("discount");
const extra = document.getElementById("extra");

const hours = document.getElementById("hours");
const amount = document.getElementById("amount");

const notes = document.getElementById("notes");

// ===============================
// حساب عدد الساعات والمبلغ
// ===============================

function calculateBooking() {

    if (!startTime.value || !endTime.value)
        return;

    const start = startTime.value.split(":");
    const end = endTime.value.split(":");

    const startMinutes =
        Number(start[0]) * 60 +
        Number(start[1]);

    let endMinutes =
    Number(end[0]) * 60 +
    Number(end[1]);

if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
}

    const totalHours =
        (endMinutes - startMinutes) / 60;

    hours.value = totalHours;

    const total =
        (totalHours * Number(hourPrice.value))
        - Number(discount.value)
        + Number(extra.value);

    amount.value = total;

}

// ===============================
// الأحداث
// ===============================

startTime.addEventListener("change", calculateBooking);
endTime.addEventListener("change", calculateBooking);

hourPrice.addEventListener("input", calculateBooking);

discount.addEventListener("input", calculateBooking);

extra.addEventListener("input", calculateBooking);