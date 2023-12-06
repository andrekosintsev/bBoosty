let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Save and Send";
tg.MainButton.show();

const muscleGrid = document.getElementById("muscles");

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
    const encodedJsonData = getQueryParam("json_data");
    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonArray = JSON.parse(jsonData);

        if (jsonArray.selected) {
            const table = createMuscleCard(jsonArray.selected);
            muscleGrid.appendChild(table);
        } else {
            tg.MainButton.hide();
            const muscleCard = document.createElement("div");
            muscleCard.innerHTML = `No exercises selected`;
            muscleGrid.appendChild(muscleCard);
        }
    } else {
        tg.MainButton.hide();
        const muscleCard = document.createElement("div");
        muscleCard.innerHTML = `No exercises selected`;
        muscleGrid.appendChild(muscleCard);
    }
});

function createMuscleCard(elements) {
    const table = document.createElement('table');
    table.classList.add('col-lg-4', 'col-sm-12', 'mb-2', 'table', 'mb-0');
    table.innerHTML = `<thead class="bg-light">
                          <tr>
                              <th scope="col" class="border-0">Actions</th>
                              <th scope="col" class="border-0">Order</th>
                              <th scope="col" class="border-0">Exercise</th>
                          </tr>
                      </thead>`;

    const muscleCard = document.createElement('tbody');

    elements.forEach((element, index) => {
        const gridItem = document.createElement('tr');
        gridItem.dataset.index = index + 1;
        gridItem.innerHTML = `
            <td>
                ${index !== 0 ? `<button class="move-up" data-index="${index + 1}">⬆️</button>` : ''}
                ${index !== elements.length - 1 ? `<button class="move-down" data-index="${index + 1}">⬇️</button>` : ''}
            </td>
            <td>${index + 1}</td>
            <td>
                <div class="card-post__image" style="background-image: url('https://bodyboots.surge.sh/${element}.gif'); position: relative; border-bottom-left-radius: 0.625rem; border-bottom-right-radius: 0.625rem;">
                </div>
            </td>`;

        muscleCard.appendChild(gridItem);
    });

    table.appendChild(muscleCard);

    // Add event listeners for move-up and move-down buttons
    table.addEventListener('click', function (event) {
        if (event.target.classList.contains('move-up')) {
            moveElement(table, event.target.dataset.index, -1);
        } else if (event.target.classList.contains('move-down')) {
            moveElement(table, event.target.dataset.index, 1);
        }
    });

    return table;
}

function moveElement(table, currentIndex, direction) {
    const rows = Array.from(table.querySelector('tbody').children);
    const currentIndexInt = parseInt(currentIndex);

    // Ensure the current index is within the valid range
    if (currentIndexInt >= 1 && currentIndexInt <= rows.length) {
        const targetIndex = currentIndexInt + direction;

        // Ensure the target index is within the valid range
        if (targetIndex >= 1 && targetIndex <= rows.length) {
            // Swap the content of the Exercise cells
            const temp = rows[currentIndexInt - 1].querySelector('td:last-child').innerHTML;
            rows[currentIndexInt - 1].querySelector('td:last-child').innerHTML = rows[targetIndex - 1].querySelector('td:last-child').innerHTML;
            rows[targetIndex - 1].querySelector('td:last-child').innerHTML = temp;

            // Remove the old event listeners and reattach them
            table.removeEventListener('click', handleButtonClick);
            table.addEventListener('click', handleButtonClick);
        }
    }
}

// Event listener for buttons
function handleButtonClick(event) {
    if (event.target.classList.contains('move-up')) {
        moveElement(table, event.target.dataset.index, -1);
    } else if (event.target.classList.contains('move-down')) {
        moveElement(table, event.target.dataset.index, 1);
    }
}

// Attach event listener for buttons
const table = document.querySelector('.table');

Telegram.WebApp.onEvent('mainButtonClicked', function () {
    const selectedExercises = Array.from(document.querySelectorAll('tbody tr')).map((item) => {
        return {
            id: item.dataset.index,
            orderIndex: item.querySelector('.move-up').dataset.index // Using move-up button as a reference for order index
        };
    });

    tg.sendData(JSON.stringify({
        result: selectedExercises
    }));

    tg.close();
});
