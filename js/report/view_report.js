
let urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');


fetch(`http://127.0.0.1:5000/report/id/${_id}`)
    .then(response => response.json())
    .then(report => {
      let row = createReportTemplate(report);
      let table = $("#reports tbody");
      table.append(row);

      let customers = report.customers; 

      let customerTable = $("#customer-table tbody");
      customers.forEach(customer => {
        let row = createCustomerTemplate(customer);
        customerTable.append(row);
      });
    });


function displayTopCustomers(topCustomers) {
  let table = $("#customer-table tbody");
  table.empty();

  let template = $("#customer-row-template").html(); 

  for (let i = 0; i < topCustomers.length; i++) {
    let customer = topCustomers[i];
    let row = Mustache.render(template, {
      i: i + 1,
      client_id: customer._id,
      client_name: customer.name,
      client_dni: customer.dni
    });
    table.append(row);
  }
}


function createCustomerTemplate(customer) {
    let template = $("#customer-row-template")[0].innerHTML;
    return Mustache.render(template, customer);
  }






function loadInformation() {
    let urlParams = new URLSearchParams(window.location.search);
    let _id = urlParams.get('_id');
    fetchReport(_id).then(report => {
        displayTopCustomers(report.top_customers);
    })
    .catch(error => {
        console.error("Error loading information:", error);
    });
}








function createReportTemplate(report) {
    let template = $("#report-item-template")[0].innerHTML;
    return Mustache.render(template, report);
}

window.addEventListener("load", function() {
    loadInformation();
});