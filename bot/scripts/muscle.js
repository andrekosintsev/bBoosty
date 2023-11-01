let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Подобрать программу";
tg.MainButton.show();

const selectedIds = [];


// List of muscle data
const muscleData = [{
    id: "biceps",
    short: "Biceps",
    name: "Бицепс",
    imageUrl: "https://images.unsplash.com/photo-1621750627159-cf77b0b91aac?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Большая мышца плеча, хорошо заметна под кожей. Проксимальная часть состоит из двух головок — длинной (caput longum) и короткой (caput breve).",
}, {
    id: "triceps",
    short: "Triceps",
    name: "Трицепс",
    imageUrl: "https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Мышца-разгибатель задней группы плеча, занимает всю заднюю сторону плеча, состоит из трёх головок — длинной (caput longum), латеральной (caput laterale) и медиальной (caput mediale).",
}, {
    id: "lower_back",
    short: "Lower Back",
    name: "Нижние мышцы спины",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Поясничный треугольник (лат. trigonum lumbale, петитов треугольник) ограничен сверху и медиально сухожильным пучком широчайшей мышцы спины, латерально задним краем наружной косой мышцы живота, снизу подвздошным гребнем, дном является внутренняя косая мышца живота.",
}, {
    id: "abdominals",
    short: "ABS",
    name: "Прямая мышца живота",
    imageUrl: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?auto=format&fit=crop&q=80&w=2798&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "парная плоская длинная лентовидной формы мышца, широкая вверху и суженная внизу, располагается сбоку от срединной линии.",
}, {
    id: "abductors",
    short: "Hip, Abductors",
    name: "Мышцы бедра",
    imageUrl: "https://images.unsplash.com/photo-1534367990512-edbdca781b00?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "В человеческой анатомии мышцы тазобедренного сустава - это те мышцы, которые вызывают движение в бедре. Большинство современных анатомов определяют 17 таких мышц, хотя иногда могут учитываться дополнительные мышцы.",
}, {
    id: "adductors",
    short: "Hip, Adductor",
    name: "Аддукторные мышцы бедра",
    imageUrl: "https://images.unsplash.com/photo-1540206235220-7590996b7a5a?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Аддукторные мышцы бедра - это группа мышц, расположенных в медиальном отделе бедра, в основном используемых для сведения бедер вместе.",
}, {
    id: "calves",
    short: "Calves",
    name: "Икроножная мышца",
    imageUrl: "https://images.unsplash.com/photo-1630877268428-616cc533239a?auto=format&fit=crop&q=80&w=2865&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Икра (мн. ч.: икры; лат.: sura) - это задняя часть нижней части ноги в человеческой анатомии. Мышцы внутри икры соответствуют заднему отделу ноги.",
}, {
    id: "chest",
    short: "Chest",
    name: "Мышцы грудного отдела",
    imageUrl: "https://images.unsplash.com/photo-1534790844238-52687519e5f0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Грудные мышцы (повсеместно называемые «грудь») - это мышцы, соединяющие переднюю часть груди человека с костями верхней части руки и плеча. В этой области находится четыре мышцы, обеспечивающие движения верхних конечностей или рёбер.",
}, {
    id: "forearms",
    short: "Forearms",
    name: "Предплечье",
    imageUrl: "https://images.unsplash.com/photo-1692419978726-fd68d368be7f?auto=format&fit=crop&q=80&w=2835&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Собственные мышцы предплечья действуют на само предплечье, то есть через локтевой сустав и проксимальные и дистальные луче-локтевые суставы (что приводит к пронации или супинации), в то время как наружные мышцы действуют на кисть и запястье. В большинстве случаев, внешние передние мышцы являются сгибателями, в то время как внешние задние мышцы являются разгибателями.",
}, {
    id: "glutes",
    short: "Glutes",
    name: "Ягодичные мышцы",
    imageUrl: "https://images.unsplash.com/photo-1689490688215-31bbbfd4ab03?auto=format&fit=crop&q=80&w=2241&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "это группа из трех мышц, которые образуют глютальную область, обычно называемую ягодицами: большая, средняя и малая глутировые мышцы. Эти три мышцы берут начало от бедра и крестца и вставляются на бедро",
}, {
    id: "hamstrings",
    short: "Hamstring",
    name: "Бицепс бедра",
    imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "В анатомии человека бицепс бедра (/ ˈhæmstrɪŋ /) - это одна из трех мышц задней части бедра, находящаяся между бедром и коленом (с медиальной на латеральную: полуперепончатая мышца, полутендиоз и двуглавая мышца бедра).",
}, {
    id: "lats",
    short: "Lats",
    name: "Широчайшая мышца спины",
    imageUrl: "https://images.unsplash.com/photo-1534872850130-5355701fcc89?auto=format&fit=crop&q=80&w=2848&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "(латинское название: 'musculus latissimus dorsi'), также известная как большая мышца спины, протягивается по всей длине позвоночника под лопаткой, частично перекрываясь трапециевидной мышцей, и заканчивается на верхнем краю таза.",
}, {
    id: "middle_back",
    short: "Middle Back",
    name: "Мышцы середины спины",
    imageUrl: "https://images.unsplash.com/photo-1589880768855-b106592ac541?auto=format&fit=crop&q=80&w=2873&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Нижняя часть трапеций, а также находящиеся под ней большая и малая ромбовидные мышцы.",
}, {
    id: "neck",
    short: "Neck",
    name: "Мышцы шеи",
    imageUrl: "https://images.unsplash.com/photo-1660739270492-6b79793ed992?auto=format&fit=crop&q=80&w=2921&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Собственные мышцы шеи, надподъязычные мышцы, подподъязычные мышцы, подзатылочные мышцы.",
}, {
    id: "quadriceps",
    short: "Quadriceps",
    name: "Четырёхглавая мышца бедра",
    imageUrl: "https://images.unsplash.com/photo-1612441612875-650a116e922d?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "(лат. Musculus quadriceps femoris) — занимает всю переднюю и отчасти боковую поверхность бедра. Состоит из четырёх головок, все они переходят в общее сухожилие, которое охватывает надколенник и прикрепляется к бугристости большеберцовой кости",
}, {
    id: "traps",
    short: "Traps",
    name: "Мышца трапециевидная",
    imageUrl: "https://images.unsplash.com/photo-1692450374968-0c0c136b18ab?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "(также называемая мышцами капюшона) - это треугольная и плоская мышца плечевого пояса. Она находится в области шеи и верхней части спины и разделена на три различных участка, каждый из которых выполняет свою функцию.",
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
            muscle_group: selectedIds
        }));
        tg.close();
    } else {
        tg.showPopup({
            title: 'Выберите категорию',
            message: 'Вы не выбрали категорию мышц для тренировки',
            buttons: [{
                id: 'delete',
                type: 'ok',
                text: 'OK'
            }]
        });

    }
});