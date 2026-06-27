const calendarEl = document.getElementById("calendar");

const calendar = new FullCalendar.Calendar(calendarEl, {

    locale: "ar",

    direction: "rtl",

    initialView: "dayGridMonth",

    height: "auto",

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
