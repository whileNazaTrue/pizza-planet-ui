

const fetchBeverage = async (_id)  =>{
    await fetch(`http://127.0.0.1:5000/beverage/id/${_id}`)
        .then(response => response.json())
        .then(beverage => {
            $("#_id").val(beverage._id);
            $("#name").val(beverage.name);
            $("#price").val(beverage.price);

        });
}

const loadInformation = () =>{
    let urlParams = new URLSearchParams(window.location.search);
    let _id = urlParams.get('_id');
    fetchBeverage(_id)
}

const putBeverage = (beverage) => {

    fetch('http://127.0.0.1:5000/beverage/', {
        method: 'PUT',
        body: JSON.stringify(beverage),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then(res => res.json())
        .then(res => showNotification("#beverage-alert"));
}


let beverageForm = $("#beverage-form");
beverageForm.submit(event => {

    let beverages = getBeverageData();
    putBeverage(beverages);

    event.preventDefault();
    event.currentTarget.reset();
    window.location.href = '/app/beverage/beverages.html';
});


const getBeverageData = () => {
    return {
        _id: $("input[id='_id']").val(),
        name: $("input[id='name']").val(),
        price: $("input[id='price']").val()
    };
}

window.onload = loadInformation;