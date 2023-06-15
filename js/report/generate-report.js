const getYears = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/report/years', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const years = await response.json();
      let select = $("#year");
      years.forEach(yearObj => {
        let year = yearObj.year;
        select.append(`<option value="${year}">${year}</option>`);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  getYears();
  
  const postReport = async (report) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/report/', {
        method: 'POST',
        body: JSON.stringify(report),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const res = await response.json();
      showNotification("#report-alert");
    } catch (error) {
      console.error(error);
    }
  };
  
  let reportForm = $("#report-form");
  reportForm.submit(async event => {
    event.preventDefault();
    let year = $("#year").val();
    let report = { year: year };
    await postReport(report);
    event.currentTarget.reset();
  });
  
  const showNotification = (alertSelector) => {
    let alert = $(alertSelector);
    alert.toggle();
    setTimeout(() => alert.toggle(), 5000);
  };
  