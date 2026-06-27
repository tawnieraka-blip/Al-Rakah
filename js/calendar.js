document.addEventListener("DOMContentLoaded", function () {

    const calendarEl = document.getElementById("calendar");

    const calendar = new FullCalendar.Calendar(calendarEl, {

        locale: "ar",

        direction: "rtl",

        initialView: "dayGridMonth",

        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: ""
        },

        buttonText: {
            today: "اليوم"
        },

        events: []

    });

    calendar.render();

});
