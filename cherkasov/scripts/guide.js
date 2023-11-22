let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Оставить заявку на руководство";
tg.MainButton.show();

const selectedIds = [];


// List of muscle data
const muscleData = [{
    id: "ddt",
    short: "ДДТ",
    name: "ДДТ-чек лист",
    imageUrl: "https://images.unsplash.com/photo-1629875235163-2e52306e4018?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Что такое ДДТ? Чем опасен для человека? Продукты выводящие ддт",
}, {
    id: "receipts",
    short: "Рецепты",
    name: "Исцеляющие рецепты",
    imageUrl: "https://images.unsplash.com/photo-1616501268209-edfff098fdd2?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Бульоны, крем-супы, салаты и многое другое",
}, {
    id: "water",
    short: "Вода",
    name: "Вода",
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=2788&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Вода как основной источник нашего прекрасного самочувствия! Рецепты.",
}, {
    id: "problem_products",
    short: "Продукты",
    name: "Проблематичные продукты",
    imageUrl: "https://images.unsplash.com/photo-1544926206-bd2c1e248045?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Уровни проблематичных продуктов. Список продуктов, которые необходимо исключить",
}, {
    id: "metals",
    short: "Чек-лист",
    name: "Чек лист тяжелые металлы",
    imageUrl: "https://images.unsplash.com/photo-1520697517317-6767553cc51a?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Токсичность тяжелых металлов, список тяжелых металлов, их наличие в продуктах.",
}, {
    id: "house_chemi",
    short: "Чек-лист",
    name: "Бытовая химия/ средства ухода",
    imageUrl: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Средства для умывания лица, тоники, зубная паста, дезодорант, масло для волос и тела и многое другое",
}, {
    id: "snacks",
    short: "Перекусы",
    name: "Правильные перекусы для сильных надпочечников",
    imageUrl: "https://images.unsplash.com/photo-1569420067112-b57b4f024595?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Сильная поддержка надпочечников - очень важная функция. Выберите у наc правильные примеры перекусов.",
}, {
    id: "aroma",
    short: "Продукты",
    name: "Натуральные ароматизаторы",
    imageUrl: "https://images.unsplash.com/photo-1611256243212-48a03787ea01?auto=format&fit=crop&q=80&w=2954&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Натуральные ароматизаторы, опасность, симптомы, гипоаллергенный быт.",
}, {
    id: "breakfasts",
    short: "Рецепты",
    name: "Завтраки",
    imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Фруктовые завтраки, смузи от тяжелых металлов, смузи спасения печени и многое другое.",
}, {
    id: "morning_cleaning",
    short: "Рецепты",
    name: "Основные причины утреннего очищения",
    imageUrl: "https://images.unsplash.com/photo-1674456720100-0edcdce5572b?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Основные причины утреннего очещения, три кита исцеляющего утра и многое другое.",
}];

// Function to create a muscle card
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
                    <i class="material-icons mr-1" style="display: none;">check</i>Выбрать
                </button>
            </span>
        </div>
    `;
    const selectButton = muscleCard.querySelector("button");
    selectButton.addEventListener("click", function() {
        const icon = selectButton.querySelector("i.material-icons");
        const category = selectButton.getAttribute("data-category");

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


Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (selectedIds.length > 0) {
            tg.sendData(JSON.stringify({
                guides: selectedIds
            }));
            tg.close();
    } else {
        tg.showPopup({
            title: 'Выберите категорию',
            message: 'Вы не выбрали руководство',
            buttons: [{
                id: 'delete',
                type: 'ok',
                text: 'OK'
            }]
        });

    }
});