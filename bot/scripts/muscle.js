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
        muscleGrid.appendChild(createMuscleCard(jsonArray));
    }
});

// Array to store the selected muscle categories
const selectedIds = [];

// Function to create a muscle card element
function createMuscleCard(elements) {
    const muscleCard = document.createElement("div");
    muscleCard.classList.add("grid-container","col-lg-4", "col-sm-12", "mb-2");
    //muscleCard.classList.add("col-lg-4", "col-sm-12", "mb-2");
    elements.forEach((element) => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");
                gridItem.innerHTML = `
                    <div class="card">
                            <div class="card-post__image" style="background-image: url('https://bodyboots.surge.sh/${element}.gif'); border-bottom-left-radius: 0.625rem; border-bottom-right-radius: 0.625rem;"></div>
                    </div>`;
                muscleCard.appendChild(gridItem);
                gridItem.addEventListener("click", function() {
                                        if (gridItem.classList.contains("selected")) {
                                                        gridItem.classList.remove("selected");
                                                        const index = selectedIds.indexOf(element);
                                                        if (index > -1) {
                                                            selectedIds.splice(index, 1);
                                                        }
                                                    } else {
                                                        gridItem.classList.add("selected");
                                                        selectedIds.push(element);
                                                    }
                                    });
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