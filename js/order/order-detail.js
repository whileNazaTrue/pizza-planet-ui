let urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

fetch(`http://127.0.0.1:5000/order/id/${_id}`)
    .then(response => response.json())
    .then(order => {
        let template = createRowTemplate(order);
        $("#order").append(template);
    });

const createRowTemplate = (order) => {
    let template = $("#order-template")[0].innerHTML;
    return Mustache.render(template, order);
};
