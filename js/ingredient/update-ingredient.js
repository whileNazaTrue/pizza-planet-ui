
const  fetchIngredient= async (_id) =>{
    await fetch(`http://127.0.0.1:5000/ingredient/id/${_id}`)
        .then(response => response.json())
        .then(ingredient => {
            $("#_id").val(ingredient._id);
            $("#name").val(ingredient.name);
            $("#price").val(ingredient.price);

        });
}

const loadInformation = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let _id = urlParams.get('_id');
    fetchIngredient(_id)
}

const putIngredient= (ingredient) =>{

    fetch('http://127.0.0.1:5000/ingredient/', {
        method: 'PUT',
        body: JSON.stringify(ingredient),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then(res => res.json())
        .then(res => showNotification("#ingredient-alert"));


}

/**
 * Get the form and submit it with fetch API
 */
let ingredientForm = $("#ingredient-form");
ingredientForm.submit(event => {

    let ingredient = getIngredientData();
    putIngredient(ingredient);

    event.preventDefault();
    event.currentTarget.reset();
    window.location.href = '/app/ingredient/ingredients.html';
});

/**
 * Gets the ingredient data with JQuery
 */
const getIngredientData = () => {
    return {
        _id: $("input[id='_id']").val(),
        name: $("input[id='name']").val(),
        price: $("input[id='price']").val()
    };
}


const showNotification= () => {
    let ingredientAlert = $("#ingredient-alert");
    ingredientAlert.toggle();
    setTimeout(() => ingredientAlert.toggle(), 5000);
}


window.onload = loadInformation;