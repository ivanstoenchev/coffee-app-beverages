
const coffeeForm = document.querySelector('#coffee-form');
const btnSubmit = document.querySelector('#coffee-submit');
const btnEdit = document.querySelector('#coffee-edit');


btnSubmit.addEventListener('click', function (e) {
    e.preventDefault();

    const cfd = new FormData(coffeeForm);
    const title = cfd.get('coffee-title');
    const description = cfd.get('coffee-description');
    const ingredient = cfd.get('coffee-ingredients');


    const newCoffee = {
        title,
        description,
        ingredients: [],
    };
    newCoffee.ingredients.push(ingredient);

    fetch(`https://api.sampleapis.com/coffee/hot/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCoffee),
    })
        .then(resp => resp.json())
        .then(() => {
            window.location.reload()
        })
})

fetch(`https://api.sampleapis.com/coffee/hot/`)
    .then(function (resp) {
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp;
    })
    .then(resp => resp.json())
    .then(data => displayData(data));



function displayData(data) {
    const hotdrinks = document.querySelector("#drinks");
    const desc = document.querySelector('#desc');
    const ingr = document.querySelector('#ingrd');

    for (let i = 0; i <= data.length - 1; i++) {
        hotdrinks.innerHTML += '<option value="' + data[i].id + '">' + data[i].title + '</option>';
    }

    hotdrinks.addEventListener('change', function () {
        let apiId = this.value;
        fetch(`https://api.sampleapis.com/coffee/hot/${apiId}`)
            .then(resp => resp.json())
            .then(showData => {
                desc.innerHTML = 'Description:' + '<br>' + showData.description;
                ingr.innerHTML = 'Ingredients:  ' + showData.ingredients;
            })

        btnEdit.addEventListener('click', function (e) {
            e.preventDefault();

            const cfd = new FormData(coffeeForm);
            const title = cfd.get('coffee-title');
            const description = cfd.get('coffee-description');
            const ingredient = cfd.get('coffee-ingredients');


            const newCoffee = {
                title,
                description,
                ingredients: [],
            };
            newCoffee.ingredients.push(ingredient);

            fetch(`https://api.sampleapis.com/coffee/hot/` + apiId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCoffee),
            })
                .then(resp => resp.json())
                .then(() => {
                    window.location.reload()
                })

        })
        const btnDel = document.querySelector("#del");
        btnDel.addEventListener('click', deleteCoffee);

        async function deleteCoffee(e) {
            e.preventDefault();

            await fetch(`https://api.sampleapis.com/coffee/hot/` + apiId, {
                method: 'DELETE'
            })
                .then(resp => resp.json())
                .then(() => {
                    window.location.reload()
                })
        }
    })
}



