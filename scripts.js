
let prev_id;
let prev_data;

const get_data = (id) => {

    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        .then((data) => display_data(data.data))
        .catch((err) => console.log(err))

    change_color(id)
    prev_id = id
}

const sorted = () => {
    // console.log(prev_data)

    prev_data.sort((a, b) => {
        let x = Number(a.others.views.slice(0, -1));
        let y = Number(b.others.views.slice(0, -1));
        return y - x
    });

    display_data(prev_data)
}


const display_data = (data) => {

    // console.log(data)
    let container = document.getElementById('video-container')


    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (data.length == 0) {

        let card = document.createElement("div")

        card.innerHTML = `
            
                    <div class="text-center my-5">
                        <img class="w-25" src="./PHero-Tube-main/no-video.png" alt="...">
                        <h1> Oops!! Sorry, There is<br> no content here</h1>
                    </div>
                   
                `
        container.appendChild(card)
    }
    else {

        data.forEach((category) => {

            // console.log(category)

            let card = document.createElement("div")

            card.innerHTML = `
            
                    <div class="my-3">
                        <div class="card">
                            <img src="${category.thumbnail}" class="video card-img-top" alt="...">
                            <div class="card-body">

                                <div class="d-flex justify-content-start">
                                    <img src="${category.authors[0].profile_picture}" class="profile-picture m-2" alt="...">
                                    <h6 class="card-title">${category.title}</h6>
                                </div>

                                <div class='d-flex mt-3'>
                                <p class="ms-5">${category.authors[0].profile_name}</p>
                                ${!category.authors[0].verified ? "" :
                    "<img class='verify-icon m-3 mt-0' src='./PHero-Tube-main/verify.png' alt=''>"
                }
                                </div>

                                <p class="ms-5 mt-0">${category.others.views} views</p>

                            </div>
                        </div>
                    </div>
                   
                `
            container.appendChild(card)
        })

    }

    prev_data = data
}

const change_color = (id) => {

    let buttons = document.querySelectorAll('.sorting-btn');

    buttons.forEach((button) => {
        button.classList.remove('clicked');
    });

    let button = document.getElementById(id);

    if (button) {
        button.classList.add('clicked');
    }
}

get_data("1000")
