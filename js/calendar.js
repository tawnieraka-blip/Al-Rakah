const API_URL = "https://script.google.com/macros/s/AKfycbwdFLVYkFvB_Ir-1eTGXSfAz27cY8XMLBVz3Uz2KuU8ZKtPRg6K27_w9DUPxHf3TIQTag/exec";

fetch(API_URL)
.then(response => response.json())
.then(data => {

    const events = data.map(row => {

        return {

            title: row[0] + " - " + row[3],

            start: row[1] + "T" + row[3],

            allDay: false

        };

    });

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

        events: events

    });

    calendar.render();

});