// Initialize the Telegram WebApp
let tg = window.Telegram.WebApp;

// Expand the Telegram WebApp
tg.expand();

// Set the main button text and make it visible
tg.MainButton.text = "Select Program";
tg.MainButton.show();

// Array to store the selected muscle categories
const selectedIds = [];

// List of muscle data
const muscleData = [
    {
        id: "biceps",
        short: "Biceps",
        name: "Biceps",
        imageUrl: "https://images.unsplash.com/photo-1621750627159-cf77b0b91aac?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The biceps muscle is the large shoulder muscle that is well visible under the skin. Its proximal part consists of two heads, the long head (caput longum) and the short head (caput breve).",
    },
    {
        id: "triceps",
        short: "Triceps",
        name: "Triceps",
        imageUrl: "https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The triceps muscle is the extensor muscle of the posterior group of the shoulder. It covers the entire back of the shoulder and consists of three heads: the long head (caput longum), the lateral head (caput laterale), and the medial head (caput mediale).",
    },
    {
        id: "lower_back",
        short: "Lower Back",
        name: "Lower Back Muscles",
        imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The lumbar triangle (Latin: trigonum lumbale or Petit's triangle) is bordered superiorly and medially by the tendinous bundle of the latissimus dorsi muscle, laterally by the posterior border of the external oblique muscle, inferiorly by the iliac crest, and its floor is the transversus abdominis muscle.",
    },
    {
        id: "abdominals",
        short: "ABS",
        name: "Rectus Abdominis",
        imageUrl: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?auto=format&fit=crop&q=80&w=2798&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The rectus abdominis, a paired flat muscle of the long, thin, and ribbon-like form, is broad above and narrows below and is situated on either side of the midline.",
    },
    {
        id: "abductors",
        short: "Hip, Abductors",
        name: "Hip Muscles",
        imageUrl: "https://images.unsplash.com/photo-1534367990512-edbdca781b00?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "In human anatomy, the muscles of the hip joint are those muscles which cause movement in the hip. Most modern anatomists define 17 of these muscles, although some additional muscles may sometimes be considered.",
    },
    {
        id: "adductors",
        short: "Hip, Adductor",
        name: "Adductor Muscles of the Hip",
        imageUrl: "https://images.unsplash.com/photo-1540206235220-7590996b7a5a?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The adductor muscles of the hip are a group of muscles located in the medial part of the thigh, primarily used to bring the thighs together.",
    },
    {
        id: "calves",
        short: "Calves",
        name: "Gastrocnemius Muscle",
        imageUrl: "https://images.unsplash.com/photo-1630877268428-616cc533239a?auto=format&fit=crop&q=80&w=2865&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The calf (plural: calves; Latin: sura) is the back portion of the lower leg in human anatomy. The muscles within the calf correspond to the posterior compartment of the leg.",
    },
    {
        id: "chest",
        short: "Chest",
        name: "Chest Muscles",
        imageUrl: "https://images.unsplash.com/photo-1534790844238-52687519e5f0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Chest muscles, commonly referred to as the 'pecs,' are the muscles that connect the front of the human chest to the upper arm and shoulder bones. In this area, there are four muscles responsible for upper limb or rib movements.",
    },
    {
        id: "forearms",
        short: "Forearms",
        name: "Forearms",
        imageUrl: "https://images.unsplash.com/photo-1692419978726-fd68d368be7f?auto=format&fit=crop&q=80&w=2835&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The intrinsic muscles of the forearm act upon the forearm itself, that is, across the elbow and proximal and distal radioulnar joints (resulting in pronation or supination), while the extrinsic muscles act upon the hand and wrist. In most cases, anterior extrinsic muscles are flexors, whereas posterior extrinsic muscles are extensors.",
    },
    {
        id: "glutes",
        short: "Glutes",
        name: "Gluteal Muscles",
        imageUrl: "https://images.unsplash.com/photo-1689490688215-31bbbfd4ab03?auto=format&fit=crop&q=80&w=2241&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The gluteal muscles, commonly referred to as the 'glutes,' are a group of three muscles that form the gluteal region, often referred to as the buttocks: the gluteus maximus, gluteus medius, and gluteus minimus. These three muscles originate from the hip and sacrum and insert into the femur.",
    },
    {
        id: "hamstrings",
        short: "Hamstring",
        name: "Hamstring",
        imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "In human anatomy, the hamstring (/ˈhæmstrɪŋ/) is one of the three muscles of the posterior thigh. It is located between the hip and the knee (from medial to lateral: semitendinosus, semimembranosus, and biceps femoris).",
    },
    {
        id: "lats",
        short: "Lats",
        name: "Latissimus Dorsi",
        imageUrl: "https://images.unsplash.com/photo-1534872850130-5355701fcc89?auto=format&fit=crop&q=80&w=2848&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The latissimus dorsi (Latin name: 'musculus latissimus dorsi'), also known as the 'lats,' extends along the entire length of the spine under the shoulder blade, partially overlapping the trapezius muscle, and attaches to the upper edge of the pelvis.",
    },
    {
        id: "middle_back",
        short: "Middle Back",
        name: "Middle Back Muscles",
        imageUrl: "https://images.unsplash.com/photo-1589880768855-b106592ac541?auto=format&fit=crop&q=80&w=2873&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The lower part of the trapezius, as well as the major and minor rhomboid muscles located beneath it.",
    },
    {
        id: "neck",
        short: "Neck",
        name: "Neck Muscles",
        imageUrl: "https://images.unsplash.com/photo-1660739270492-6b79793ed992?auto=format&fit=crop&q=80&w=2921&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The neck muscles consist of intrinsic, suprahyoid, infrahyoid, and suboccipital muscles.",
    },
    {
        id: "quadriceps",
        short: "Quadriceps",
        name: "Quadriceps Femoris",
        imageUrl: "https://images.unsplash.com/photo-1612441612875-650a116e922d?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The quadriceps femoris muscle (Latin: Musculus quadriceps femoris) covers the entire front and part of the side of the thigh. It consists of four heads, all of which merge into a common tendon that wraps around the patella and attaches to the tuberosity of the tibia.",
    },
    {
        id: "traps",
        short: "Traps",
        name: "Trapezius Muscle",
        imageUrl: "https://images.unsplash.com/photo-1692450374968-0c0c136b18ab?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The trapezius muscle, also known as the 'traps,' is a triangular and flat muscle of the shoulder girdle. It is located in the neck and upper back region and is divided into three distinct parts, each with its own function.",
    },
];

// Function to create a muscle card element
function createMuscleCard(muscle) {
    const element = document.createElement("div");
    element.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-4");
    const muscleCard = document.createElement("div");
    muscleCard.classList.add("card", "card-small", "card-post", "card-post--1");
    muscleCard.innerHTML = `
        <div class="card-post__image" style="background-image: url('${muscle.imageUrl}');">
            <a href="#" class="card-post__category badge badge-pill badge-info">${muscle.short}</a>
        </div>
        <div class="card-body">
            <h5 class="card-title">
                <a class="text-fiord-blue" href="#">${muscle.name}</a>
            </h5>
            <p class="card-text d-inline-block mb-3">${muscle.description}</p>
            <span class="text-muted">
                <button id="${muscle.id}" type="button" class="mb-2 btn btn-sm btn-pill btn-outline-primary mr-2">
                    <i class="material-icons mr-1" style="display: none;">check</i>Select
                </button>
            </span>
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
    element.appendChild(muscleCard);
    return element;
}

// Get the muscle grid container
const muscleGrid = document.getElementById("muscles");

// Populate the grid with muscle cards
muscleData.forEach((muscle) => {
    const muscleCard = createMuscleCard(muscle);
    muscleGrid.appendChild(muscleCard);
});

// Event handler for the main button click
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (selectedIds.length > 0) {
        if (selectedIds.length >= 2) {
            // Display an error message if more than one category is selected
            tg.showPopup({
                title: 'Error',
                message: 'You have selected more than 1 category. Please remove the extra selections. I will prepare exercises for one muscle group. After completing the program, you can choose another group.',
                buttons: [{
                    id: 'delete',
                    type: 'ok',
                    text: 'OK'
                }]
            });
        } else {
            // Send the selected muscle categories to the Telegram WebApp and close the app
            tg.sendData(JSON.stringify({
                muscle_group: selectedIds
            }));
            tg.close();
        }
    } else {
        // Display a message to choose a category if none is selected
        tg.showPopup({
            title: 'Choose a Category',
            message: 'You have not selected a muscle category for your workout.',
            buttons: [{
                id: 'delete',
                type: 'ok',
                text: 'OK'
            }]
        });
    }
});