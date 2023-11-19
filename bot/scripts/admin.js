// Get the muscle grid container
const muscleGrid = document.getElementById("muscles");

let muscleData =[];

// Populate the grid with muscle cards
muscleData.forEach((muscle) => {
    const muscleCard = createMuscleCard(muscle);
    muscleGrid.appendChild(muscleCard);
});
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8084/muscle?name=biceps')
        .then(response => response.json())
        .then(data => {
          data.forEach(muscle => {
                const muscleCard = createMuscleCard(muscle);
                muscleGrid.appendChild(muscleCard);
          });

        })
        .catch(error => {
          console.error('Error fetching country data:', error);
        });
});


// Function to create a muscle card element
function createMuscleCard(muscle) {
    const element = document.createElement("div");
    element.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-4");
    const muscleCard = document.createElement("div");
    muscleCard.classList.add("card", "card-small", "card-post", "card-post--1");
    muscleCard.innerHTML = `
        <!--<iframe src="${muscle.video}" class="card-post__image" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            <a href="#" class="card-post__category badge badge-pill badge-info">${muscle.id}</a>
        </iframe>-->
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
                <button id="save" type="button" class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2">
                    save
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

    const selectButton = muscleCard.querySelector("button");
    selectButton.addEventListener("click", function() {
        fetch('http://localhost:8084/muscle', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                   id: muscle.id,
                                   exDbId : muscleCard.getElementsByClassName('form-control')[1].value ? muscleCard.getElementsByClassName('form-control')[1].value : null,
                                   video : muscleCard.getElementsByClassName('form-control')[3].value ? muscleCard.getElementsByClassName('form-control')[3].value: null,
                                   instructions: textAreaElement.value()
                                })
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