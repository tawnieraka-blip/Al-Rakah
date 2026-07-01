// =====================================================
// FRONTEND LOGIC (GitHub Pages) - ملعب جمعية الراكة
// =====================================================

// الرابط الخاص بـ Web App من Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cy8XMLBz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec"; 

// دالة موحدة لإرسال واستقبال البيانات من السيرفر
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

// تشغيل الدوال بمجرد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    // جلب الإحصائيات لو كنا في الصفحة الرئيسية أو صفحة الإحصائيات
    loadDashboardStats();
    
    // جلب وعرض الكروت لو كنا في صفحة عرض الحجوزات
    loadBookingsCards();

    // ربط استمارة الحجز الجديد لو موجودة بالصفحة
    const form = document.getElementById("bookingForm");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
});

// 1. جلب البيانات وعرضها داخل "كروت الإحصائيات الفخمة" الخاصة بك
async function loadDashboardStats() {
    const res = await sendRequest("getStats");
    if (res) {
        // البحث عن قيم الإحصائيات في واجهتك الأصلية وتحديثها
        const elements = document.querySelectorAll('.stat-card h2, .card h2, .stats-container p, .stats-grid p');
        
        // إذا كانت العناصر موجودة، نقوم بتحديثها بناءً على الترتيب أو الـ IDs
        if(document.getElementById("totalBookings")) document.getElementById("totalBookings").innerText = res.bookings || 0;
        if(document.getElementById("totalHours")) document.getElementById("totalHours").innerText = res.hours || 0;
        if(document.getElementById("totalRevenue")) document.getElementById("totalRevenue").innerText = (res.revenue || 0) + " ريال";
        
        // تحديث كروت الإحصائيات الأصلية بناءً على محتوى النصوص المصاحبة لها في تصميمك
        document.querySelectorAll('.card, .stat-card').forEach(card => {
            const title = card.innerText;
            const valueElement = card.querySelector('p') || card.querySelector('h2') || card.querySelector('.stat-value');
            if (valueElement) {
                if (title.includes("إجمالي الحجوزات")) valueElement.innerText = res.bookings;
                if (title.includes("إجمالي الساعات")) valueElement.innerText = res.hours;
                if (title.includes("إجمالي الإيرادات") || title.includes("الدخل")) valueElement.innerText = res.revenue + " ريال";
            }
        });
    }
}

// 2. بناء "كروت الحجوزات" ديناميكياً بنفس تصميمك المبهر دون جداول
async function loadBookingsCards() {
    // البحث عن الحاوية الأصلية للكروت في صفحة عرض الحجوزات (تلقائياً حسب تصميمك)
    const container = document.querySelector('.bookings-grid') || document.querySelector('.container-cards') || document.getElementById('bookingsContainer');
    if (!container) return;

    container.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>جاري تحميل الحجوزات الحالية...</p>";

    // جلب الحجوزات المعلقة والمؤكدة لعرضها
    const pending = await sendRequest("getPending") || [];
    const confirmed = await sendRequest("getConfirmed") || [];
    const allBookings = [...pending, ...confirmed];

    container.innerHTML = ""; // تفريغ الحاوية

    if (allBookings.length === 0) {
        container.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>لا توجد حجوزات مسجلة حالياً</p>";
        return;
    }

    // بناء الكروت بنفس الهيكل والأيقونات والألوان اللي اخترتها في الحجوزات.png
    allBookings.forEach(row => {
        const card = document.createElement("div");
        card.className = "booking-card"; // يقرأ كلاس التنسيق الأصلي الخاص بك من ملف الـ CSS
        
        // كود الـ HTML الخاص بالكارت الأصلي مع تعبئة البيانات ديناميكياً
        card.innerHTML = `
            <div class="card-header">
                <h3>${row[0]}</h3>
            </div>
            <div class="card-body">
                <p>🗓️ <strong>التاريخ:</strong> ${row[1]}</p>
                <p>📅 <strong>اليوم:</strong> ${row[2]}</p>
                <p>🕒 <strong>وقت الدخول:</strong> ${row[3]}</p>
                <p>⏳ <strong>عدد الساعات:</strong> ${row[4]}</p>
                <p class="price">💰 <strong>المبلغ:</strong> ${row[5]} ريال</p>
                <span class="status-badge ${row[6] === 'معلق' ? 'pending' : 'confirmed'}" style="display:inline-block; margin-top:10px; padding:3px 8px; border-radius:4px; font-size:12px; background-color:${row[6] === 'معلق' ? '#ffeeba' : '#d4edda'}; color:${row[6] === 'معلق' ? '#856404' : '#155724'};">
                    ${row[6]}
                </span>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. معالجة إرسال الفورم لحفظ حجز جديد (إذا تم استخدامه)
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const bookingData = {
        team: document.getElementById("teamName")?.value || "",
        bookingDate: document.getElementById("bookingDate")?.value || "",
        day: document.getElementById("bookingDay")?.value || "",
        checkIn: document.getElementById("checkInTime")?.value || "",
        hours: document.getElementById("bookingHours")?.value || "",
        amount: document.getElementById("bookingAmount")?.value || ""
    };

    const res = await sendRequest("add", bookingData);
    if (res.success) {
        alert("🎉 " + res.message);
        document.getElementById("bookingForm").reset();
        loadDashboardStats();
    } else {
        alert("❌ خطأ: " + res.message);
    }
}
