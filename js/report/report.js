const fetchReports = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/report/");
    const reports = await response.json();
    const rows = reports.map(createReportTemplate);
    const table = $("#reports tbody");
    table.append(rows);
  } catch (error) {
    console.error(error);
  }
};

const createReportTemplate = (report) => {
  let template = $("#report-item-template")[0].innerHTML;
  return Mustache.render(template, report);
};

fetchReports();