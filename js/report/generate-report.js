function getYears() {
    fetch('http://127.0.0.1:5000/report/years', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then(res => res.json())
    .then(years => {
        let select = $("#year");
        years.forEach(yearObj => {
            let year = yearObj.year;  
            select.append(`<option value="${year}">${year}</option>`);
        });
    });
}

getYears();

function postReport(report) {
    fetch('http://127.0.0.1:5000/report/', {
        method: 'POST',
        body: JSON.stringify(report),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then(res => res.json())
    .then(res => showNotification())
    .catch(error => console.error(error));
}


let reportForm = $("#report-form");
reportForm.submit(event => {
    let year = $("#year").val();
    let report = { year: year };
    postReport(report);
    event.preventDefault();
    event.currentTarget.reset();
});

function getReportData() {
    return {
        year: $("input[name='year']").val(),
    };
}

function showNotification() {
    let reportAlert = $("#report-alert");
    reportAlert.toggle();
    setTimeout(() => reportAlert.toggle(), 5000);
}