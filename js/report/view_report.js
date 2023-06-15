let urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

fetch(`http://127.0.0.1:5000/report/id/${_id}`)
  .then(response => response.json())
  .then(report => {
    let row = createReportTemplate(report);
    let table = $("#reports tbody");
    table.append(row);

    const customerIds = [
      report.top_one_customer._id,
      report.top_two_customer._id,
      report.top_three_customer._id
    ];

    fetchCustomers(customerIds)
      .then(customers => {
        let customerTable = $("#customer-table tbody");
        customers.forEach(customer => {
          let row = createCustomerTemplate(customer);
          customerTable.append(row);
        });
      })
      .catch(error => {
        console.log("Error fetching customers:", error);
      });
  })
  .catch(error => {
    console.log("Error fetching report:", error);
  });

function fetchCustomers(customerIds) {
  let promises = customerIds.map(customerId => {
    return fetch(`http://127.0.0.1:5000/customer/id/${customerId}`)
      .then(response => response.json())
      .then(customer => customer)
      .catch(error => {
        console.log(`Error fetching customer with ID ${customerId}:`, error);
        return null;
      });
  });

  return Promise.all(promises).then(customers =>
    customers.filter(customer => customer !== null)
  );
}

function createCustomerTemplate(customer) {
  let template = $("#customer-row-template").html();
  return Mustache.render(template, customer);
}


function displayTopCustomers(report) {
  let table = $("#customer-table tbody");
  table.empty();

  let topCustomers = [
    report.top_one_customer,
    report.top_two_customer,
    report.top_three_customer
  ];

  topCustomers.forEach((customer, index) => {
    let row = createCustomerTemplate(customer);
    table.append(row);
  });
}

function createReportTemplate(report) {
  let template = $("#report-item-template").html();
  return Mustache.render(template, report);
}

$(document).ready(function () {
  loadInformation();
});
