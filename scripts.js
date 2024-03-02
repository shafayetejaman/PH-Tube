
let prev_id = null;
let prev_data = null;

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
            card.classList.add("col-md-3", "my-3")

            card.innerHTML = `
                    
                        <div class="card">
                            <div class="position-relative">
                                <h6 class="time-stamp position-absolute">${time_stamp(category)}</h6>
                                <img src="${category.thumbnail}" class="video card-img-top" alt="...">
                            </div>
                            <div class="card-body">

                                <div class="d-flex justify-content-start">
                                    <img src="${category.authors[0].profile_picture}" class="profile-picture m-2" alt="...">
                                    <h5 class="card-title mt-2">${category.title}</h5>
                                </div>

                                <div class='d-flex mt-2'>
                                <p class="ms-5 mt-0">${category.authors[0].profile_name}</p>
                                ${verified(category)}
                                </div>

                                <p class="ms-5 mt-0">${category.others.views} views</p>

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

const verified = (category) => {
    if (category.authors[0].verified)
        return "<img class='verify-icon m-3 mt-0' src='./PHero-Tube-main/verify.png' alt=''>";

    else return "";

}

const time_stamp = (category) => {
    if (category.others.posted_date) {

        let s = Number(category.others.posted_date)

        let h = Math.floor(s / 3600)
        let m = Math.floor(s / 60) - (h * 60)

        return `${h} hrs ${m} min ago`
    }
    else return ""
}

get_data("1000")
