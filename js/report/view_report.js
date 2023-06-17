let urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

fetch(`http://127.0.0.1:5000/report/id/${_id}`)
  .then(response => response.json())
  .then(report => {
    displayReport(report);
    fetchCustomers(report.top_customers.map(customer => customer._id))
      .then(customers => displayTopCustomers(customers))
      .catch(error => {
        console.log("Error fetching customers:", error);
      });
  })
  .catch(error => {
    console.log("Error fetching report:", error);
  });


  const fetchCustomers = async (customerIds) => {
    let promises = customerIds.map(async (customerId) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/customer/id/${customerId}`);
        const customer = await response.json();
        return customer;
      } catch (error) {
        console.log(`Error fetching customer with ID ${customerId}:`, error);
        return null;
      }
    });
    let customers = await Promise.all(promises);
    customers = customers.filter((customer) => customer !== null);
    return customers;
  };



const displayTopCustomers = (customers) => {
  let table = $("#customer-table tbody");
  table.empty();

  customers.forEach(customer => {
    let row = createCustomerTemplate(customer);
    table.append(row);
  });
}

const createCustomerTemplate = (customer)=> {
  let template = $("#customer-row-template").html();
  return Mustache.render(template, { customer });
}

const displayReport = (report) => {
  let table = $("#reports tbody");
  table.empty();

  let row = createReportTemplate(report);
  table.append(row);
}

const createReportTemplate = (report) => {
  let template = $("#report-item-template").html();
  return Mustache.render(template, report);
}


$(document).ready( ()=> {
  loadInformation();
});
