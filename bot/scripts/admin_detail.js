// Get the muscle grid container
const muscleGrid = document.getElementById('exerciseResult');
const similarResult = document.getElementById('similarResult');

let muscleData =[];

// Populate the grid with muscle cards
muscleData.forEach((muscle) => {
    const muscleCard = createMuscleCard(muscle);
    muscleGrid.appendChild(muscleCard);
});

document.addEventListener('DOMContentLoaded', function() {
            // Add event listener to the button
            document.getElementById('getExerciseButton').addEventListener('click', async () => {
                const muscleName = document.getElementById('muscleName').value;
                const pageNumber = document.getElementById('pageNumber').value;
                const url = `http://localhost:8084/muscleone?name=${muscleName}&page=${pageNumber}&size=1`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    // Assuming you have a function 'createMuscleCard' to create a card for the exercise
                    const muscleCard = createMuscleCard(data);

                    // Assuming you have a div with the id 'muscleGrid' to append the card
                    document.getElementById('muscleGrid').innerHTML = '';
                    document.getElementById('muscleGrid').appendChild(muscleCard);
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });


// Function to create a muscle card element
function createMuscleCard(muscle) {
    const element = document.createElement("div");
    element.classList.add("col-sm-12", "mb-4");
    const muscleCard = document.createElement("div");
    muscleCard.classList.add("card", "card-small", "card-post", "card-post--1");
    muscleCard.innerHTML = `
        <iframe src="${muscle.video}" class="card-post__image" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            <a href="#" class="card-post__category badge badge-pill badge-info">${muscle.id}</a>
        </iframe>
        <div class="card-body">
        <div class="form-group">
            <input class="form-control" id="name" value="${muscle.name}" disabled/>
        </div>
        <div class="form-group">
            <input class="form-control" id="exDbId" value="${muscle.exDbId}"/>
        </div>
        <div class="form-group">
            <input class="form-control" id="muscle" value="${muscle.muscle}" disabled/>
        </div>
        <div class="form-group">
            <input class="form-control" id="video" value="${muscle.video}"/>
        </div>
        <div class="form-group">
            <input class="form-control" id="difficulty" value="${muscle.difficulty}" disabled/>
        </div>
        <div class="form-group">
            <textarea type="area" class="form-control" id="${muscle.id}"> </textarea>
        </div>
            <span class="text-muted">
                <button id="update" type="button" class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2">
                                            Update
                                </button>
            </span>
        </div>
    `;
    const textAreaElement = new SimpleMDE({
                    element: muscleCard.querySelector("textarea"),
                    spellChecker: false, // Enable spell checker if desired
                    toolbar: [
                        "bold", // Bold text
                        "italic", // Italic text
                        "heading", // Headings (h1, h2, h3, etc.)
                        "|", // Separator
                        "unordered-list", // Unordered list (bullets)
                        "ordered-list", // Ordered list (numbers)
                        "|", // Separator
                        "preview" // Toggle preview mode
                    ]
                });
    textAreaElement.value(muscle.instructions || "");

    const update = muscleCard.querySelector('#update');

    update.addEventListener("click", function() {
            const jsonObject = {
                name: muscle.name,
                id: muscle.id
            };
            const exDbIdValue = muscleCard.getElementsByClassName('form-control')[1].value;
            if (exDbIdValue !== undefined && exDbIdValue !== null && exDbIdValue!=="null") {
                jsonObject.exDbId = exDbIdValue;
            }

            const videoValue = muscleCard.getElementsByClassName('form-control')[3].value;
            if (videoValue !== undefined && videoValue !== null  && videoValue!=="null") {
                jsonObject.video = videoValue;
            }
             const muscleValue = muscleCard.getElementsByClassName('form-control')[2].value;
             if (muscleValue !== undefined && muscleValue !== null  && muscleValue!=="null") {
                    jsonObject.muscle = muscleValue;
             }

            const instructionsValue = textAreaElement.value();
            if (instructionsValue !== undefined && instructionsValue !== null && instructionsValue!=="null") {
                jsonObject.instructions = instructionsValue;
            }
            fetch('http://localhost:8084/muscle', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(jsonObject)
                                }).then(response => response.json())
                                .then(responseData => {
                                     muscleCard.getElementsByClassName('form-control')[1].value=responseData.exDbId;
                                     muscleCard.muscleCard.getElementsByClassName('form-control')[3].value=responseData.video;
                                     textAreaElement.value(responseData.instructions || "");
                                }).catch(error => {});
        });
    element.appendChild(muscleCard);
    return element;
}

document.getElementById('similar').addEventListener("click", function() {
        const jsonObject = {
            name: document.getElementById('similarName').value,
            muscle: document.getElementById('muscleName').value
        };
        fetch('http://localhost:8084/similar', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(jsonObject)
                            }).then(response => response.json())
                            .then(responseData => {
                                  similarResult.innerHTML = '';
                                  responseData.forEach(muscle => {
                                                 const muscleCard = createMuscleCardEx(muscle);
                                                 similarResult.appendChild(muscleCard);
                                           });

                            }).catch(error => {});
    });

function createMuscleCardEx(muscle) {
    const element = document.createElement("div");
    element.classList.add("col-sm-12", "mb-4");
    const muscleCard = document.createElement("div");
    muscleCard.classList.add("card", "card-small", "card-post", "card-post--1");
    muscleCard.innerHTML = `
        <div class="row">
        <img src="${muscle.gifUrl}" style="width: 200px; height: 200px;"/>
        <div class="card-body">
        <div class="form-group">
            <input class="form-control" id="name" value="${muscle.name}" disabled/>
        </div>
        <div class="form-group">
            <input class="form-control" id="name" value="${muscle.exDbId}" disabled/>
        </div>
        <div class="form-group">
            <input class="form-control" id="muscle" value="${muscle.target}" disabled/>
        </div>
        </div>
    `;
    element.appendChild(muscleCard);
    return element;
}