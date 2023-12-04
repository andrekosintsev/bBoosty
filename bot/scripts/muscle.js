// Initialize the Telegram WebApp
let tg = window.Telegram.WebApp;

// Expand the Telegram WebApp
tg.expand();

// Set the main button text and make it visible
tg.MainButton.text = "Build Program";
tg.MainButton.show();

const muscleGrid = document.getElementById("muscles");

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");
    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonArray = JSON.parse(jsonData);
        jsonArray.forEach((muscle) => {
            const muscleCard = createMuscleCard(muscle);
            muscleGrid.appendChild(muscleCard);
        });
    }
});

// Array to store the selected muscle categories
const selectedIds = [];

// Function to create a muscle card element
function createMuscleCard(muscle) {
    const muscleCard = document.createElement("div");
    muscleCard.innerHTML = `
        <div class="col-lg-3 col-sm-12 mb-2">
                            <div class="card card-small card-post card-post--aside card-post--1">
                                <div class="card-post__image" style="background-image: url('${muscle.gifUrl}');">
                                    <a href="#" class="card-post__category badge badge-pill badge-info">${muscle.difficulty}</a>
                                    <div class="card-post__author d-flex mb-5">
                                         <p class="card-text d-inline-block mb-3"><strong>Equipment:</strong><br> ${muscle.equipment}</p>
                                    </div>
                                     <div class="card-post__author d-flex">
                                            <button id="${muscle.id}" type="button" class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2">
                                                <i class="material-icons mr-1" style="display: none;">check</i>Add
                                            </button>
                                     </div>

                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <a class="text-fiord-blue" href="#">${muscle.name}</a>
                                    </h5>
                                    <p><strong>Rating:</strong> ${generateRatingStars(muscle.rating)}</p>
                                </div>
                            </div>
                        </div>
    `;
    const selectButton = muscleCard.querySelector("button");
    selectButton.addEventListener("click", function() {
        const icon = selectButton.querySelector("i.material-icons");

        // Toggle the visibility of the checkmark icon
        if (icon.style.display === "none") {
            icon.style.display = "inline-block";
            selectButton.classList.remove("btn-outline-primary");
            selectButton.classList.add("btn-primary");
            selectedIds.push(selectButton.id);
        } else {
            icon.style.display = "none";
            selectButton.classList.remove("btn-primary");
            selectButton.classList.add("btn-outline-primary");
            const index = selectedIds.indexOf(selectButton.id);
            if (index > -1) {
                selectedIds.splice(index, 1);
            }
        }
    });
    return muscleCard;
}

function generateRatingStars(rating) {
    if (!rating) {
        const emptyStar = '☆';
        return emptyStar.repeat(5);
    }

    const fullStarCount = Math.floor(rating);
    const halfStarCount = rating % 1 > 0 ? 1 : 0;

    const fullStar = '★';
    const halfStar = '☆';

    return (fullStar.repeat(fullStarCount) +
        halfStar.repeat(halfStarCount));
}

// Event handler for the main button click
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (selectedIds.length > 0) {
        if (selectedIds.length >= 6) {
            // Display an error message if more than one category is selected
            tg.showPopup({
                title: 'Error',
                message: 'You have selected more than 5 exercises. Please remove the extra selections. I will prepare program for 5 exercises only. After completing the program, you can choose another exercises to do.',
                buttons: [{
                    id: 'delete',
                    type: 'ok',
                    text: 'OK'
                }]
            });
        } else {
            // Send the selected muscle categories to the Telegram WebApp and close the app
            tg.sendData(JSON.stringify({
                exercises: selectedIds
            }));
            tg.close();
        }
    } else {
        // Display a message to choose a category if none is selected
        tg.showPopup({
            title: 'Choose a Category',
            message: 'You have not selected a exercises to do for your workout.',
            buttons: [{
                id: 'delete',
                type: 'ok',
                text: 'OK'
            }]
        });
    }
});