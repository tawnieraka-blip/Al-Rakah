// =====================================================
// FRONTEND LOGIC (GitHub Pages)
// =====================================================

// ⚠️ استبدل هذا الرابط برابط الـ Web App الخاص بك من Google Apps Script
const API_URL = "YOUR_WEB_APP_URL_HERE"; 

// دالة موحدة لإرسال الطلبات للسيرفر
async function sendRequest(action, data = {}) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ action: action, data: data })
        });
        return await response.json();
    } catch (error) {
        console.error("خطأ في الاتصال بالخادم:", error);
        return { success: false, message: "فشل الاتصال بالخادم" };
    }
}

// عند تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", () => {
    loadDashboardStats();
    loadPendingBookings();

    // ربط استمارة الحجز
    const form = document.getElementById("bookingForm");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
});

// معالجة إرسال الفورم لحفظ حجز جديد
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const bookingData = {
        team: document.getElementById("teamName").value,
        bookingDate: document.getElementById("bookingDate").value,
        day: document.getElementById("bookingDay").value,
        checkIn: document.getElementById("checkInTime").value,
        hours: document.getElementById("bookingHours").value,
        amount: document.getElementById("bookingAmount").value
    };

    const res = await sendRequest("add", bookingData);
    if (res.success) {
        alert(res.message);
        document.getElementById("bookingForm").reset();
        // إعادة تحميل البيانات لتحديث الشاشة فوراً
        loadDashboardStats();
        loadPendingBookings();
    } else {
        alert("خطأ: " + res.message);
    }
}

// جلب وتحديث الإحصائيات في الكروت
async function loadDashboardStats() {
    const res = await sendRequest("getStats");
    if (res && res.bookings !== undefined) {
        if(document.getElementById("statBookings")) document.getElementById("statBookings").innerText = res.bookings;
        if(document.getElementById("statHours")) document.getElementById("statHours").innerText = res.hours;
        if(document.getElementById("statRevenue")) document.getElementById("statRevenue").innerText = res.revenue + " ج.م";
        if(document.getElementById("statPending")) document.getElementById("statPending").innerText = res.pending;
    }
}

// جلب وعرض الحجوزات المعلقة في الجدول
async function loadPendingBookings() {
    const tableBody = document.getElementById("pendingBookingsTable");
    if (!tableBody) return;

    tableBody.innerHTML = "<tr><td colspan='7'>جاري تحميل البيانات...</td></tr>";
    
    const bookings = await sendRequest("getPending");
    tableBody.innerHTML = ""; // تفريغ الجدول

    if (!bookings || bookings.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='7'>لا توجد حجوزات معلقة حالياً</td></tr>";
        return;
    }

    bookings.forEach(row => {
        // row[7] هو الـ ID الفريد للحجز
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
            <td>${row[4]}</td>
            <td>${row[5]} ج.م</td>
            <td>
                <button class="btn-confirm" onclick="confirmBookingAction('${row[7]}')">تأكيد</button>
                <button class="btn-delete" onclick="deleteBookingAction('${row[7]}')">حذف</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// إجراء تأكيد الحجز من الجدول
async function confirmBookingAction(id) {
    if(confirm("هل أنت متأكد من تأكيد هذا الحجز؟")) {
        const res = await sendRequest("confirm", { id: id });
        alert(res.message);
        loadDashboardStats();
        loadPendingBookings();
    }
}

// إجراء حذف الحجز من الجدول
async function deleteBookingAction(id) {
    if(confirm("هل أنت متأكد من حذف هذا الحجز نهائياً؟")) {
        const res = await sendRequest("delete", { id: id });
        alert(res.message);
        loadDashboardStats();
        loadPendingBookings();
    }
}
