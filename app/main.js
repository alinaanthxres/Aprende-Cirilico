window.addEventListener('load', () => {
    infoMenu();


    const position = { x: 0, y: 0 };

    //PARA MOVER LOS DRAGGABLES

    function dragMoveListener(event) {
        var target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
        // translate the element
        target.style.webkitTransform = target.style.transform =
            "translate(" + x + "px, " + y + "px)";
        // update the posiion attributes
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
    }

    //PARA CONVERTIR EN DRAGGABLE

    interact(".draggable").draggable({

        listeners: {
            start(event) {
                //console.log(event.type, event.target);
            },
            move: dragMoveListener,
        },
        modifiers: [
            interact.modifiers.restrict({
                restriction: "body",
                endOnly: true,
            }),
        ],
    });

    //CONTADOR DE PUNTOS
    let counter = 0;

    let points = document.querySelector(".points");

    points.innerHTML = counter;

    // ERRORES
    let counterErrors = 0;
    let errors = document.querySelector(".errors");
    errors.innerHTML = counterErrors;


    //CREAR DROPZONES Y LA INTERACCIÓN
    const dropzoneCreate = (val1, val2, val3) => {
        interact(val1).dropzone({
            // only accept elements matching this CSS selector
            // accept: '#yes-drop',
            // Require a 75% element overlap for a drop to be possible

            overlap: 0.3,
            // listen for drop related events:
            ondropactivate: function (event) {
                // add active dropzone feedback
                event.target.classList.add("drop-active");

            },
            ondragenter: function (event) {
                var draggableElement = event.relatedTarget;
                var dropzoneElement = event.target;
                // feedback the possibility of a drop
                dropzoneElement.classList.add("drop-target");

            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove("drop-target");
                event.relatedTarget.classList.remove("correct");
            },
            ondrop: function (event) {
                if (event.relatedTarget.id == val2) {
                    event.relatedTarget.classList.add(val3);
                    counter++;
                    points.innerHTML = counter;

                } else {
                    counterErrors++;
                    errors.innerHTML = counterErrors;
                }

                //BOTON SIGUIENTE NIVEL

                let nextLevel = () => {

                    let button = document.querySelector("#next");
                    if (counter == 5) {
                        button.classList.add("nextShow")
                    }

                    button.addEventListener('click', () => {
                        button.classList.remove('nextShow');
                    });
                }
                nextLevel();

                //PÁGINA DE RESETEO
                let resetPage = document.querySelector(".resetPage");

                let showResetPage = () => {
                    if (counter == 10) {
                        resetPage.classList.remove("resetPageUnvisible");
                    }
                }
                showResetPage();
                //RESET BUTTON
                let resetButton = document.getElementById("reset");

                let startAgain = () => {
                    console.log("hola");
                    resetPage.classList.add("resetPageUnvisible");
                    location.reload();
                };

                resetButton.addEventListener("click", startAgain);

                // PUNTOS FINALES
                let pointsFinal = document.querySelector(".pointsFinal");
                pointsFinal.innerHTML = counter;

                let errorsFinal = document.querySelector(".errorsFinal");
                errorsFinal.innerHTML = counterErrors;

            },

            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove("drop-active");
                event.target.classList.remove("drop-target");

            },
        });

    };

    dropzoneCreate(".dropzone_01", "solution-01", "correct01");
    dropzoneCreate(".dropzone_02", "solution-02", "correct02");
    dropzoneCreate(".dropzone_03", "solution-03", "correct03");
    dropzoneCreate(".dropzone_04", "solution-04", "correct04");
    dropzoneCreate(".dropzone_05", "solution-05", "correct05");



    //JSON
    const levels = [
        {
            level: 1,
            title: "Letras Latinas",
            options: [
                {
                    text: "a",
                    solution: "solution-01"
                },
                {
                    text: "em",
                    solution: "solution-05"
                },
                {
                    text: "te",
                    solution: "solution-02"
                },
                {
                    text: "ka",
                    solution: "solution-03"
                },
                {
                    text: "o",
                    solution: "solution-04"
                },
            ],
            answers: [
                {
                    text: "Aa",
                    solution: "solution-01",
                    color: " rgb(123, 181, 247)",
                    num: 1

                },
                {
                    text: "Tт",
                    solution: "solution-02",
                    color: " rgb(238, 97, 54)",
                    num: 2
                },
                {
                    text: "Kk",
                    solution: "solution-03",
                    color: " rgb(66, 240, 110)",
                    num: 3
                },
                {
                    text: "Oo",
                    solution: "solution-04",
                    color: " rgb(248, 203, 56)",
                    num: 4
                },
                {
                    text: "Mм",
                    solution: "solution-05",
                    color: " rgb(179, 101, 243)",
                    num: 5
                },
            ],
        },
        {
            level: 2,
            title: "Letras Latinas 2",
            options: [
                {
                    text: "ve",
                    solution: "solution-02"
                },
                {
                    text: "yo",
                    solution: "solution-01"
                },
                {
                    text: "es",
                    solution: "solution-05"
                },
                {
                    text: "ye",
                    solution: "solution-03"
                },
                {
                    text: "u",
                    solution: "solution-04"
                },
            ],
            answers: [
                {
                    text: "Ёё",
                    color: " rgb(123, 181, 247)",
                    num: 1
                },
                {
                    text: "Bв",
                    color: " rgb(238, 97, 54)",
                    num: 2
                },
                {
                    text: "Ee",
                    color: " rgb(66, 240, 110)",
                    num: 3
                },
                {
                    text: "Уу",
                    color: " rgb(248, 203, 56)",
                    num: 4
                },
                {
                    text: "Cc",
                    color: " rgb(179, 101, 243)",
                    num: 5
                },
            ],
        },
    ];


    const levelTitle = document.getElementById("level_title");
    const levelNumber = document.getElementById("level_number");
    let nextButton = document.getElementById("next");
    let optionsContainer = document.querySelector(".ulOptions");
    let answersContainer = document.querySelector(".ulAnswers");
    let currentLevel = 0;

    // NEXT LEVEL
    let populateGameLevel = () => {
        contentOptions = "";
        for (i = 0; i < levels[currentLevel].options.length; i++) {
            let currentOption = levels[currentLevel].options[i];
            contentOptions += `<li class="draggable" id="${currentOption.solution}">${currentOption.text}</li>`
        }

        contentAnswers = "";
        for (i = 0; i < levels[currentLevel].answers.length; i++) {
            let currentAnswer = levels[currentLevel].answers[i];
            contentAnswers += `<li class="answer">
            <h1 class="letra" style="color: ${currentAnswer.color}">${currentAnswer.text}</h1>
            <div class="dropzone dropzone_0${currentAnswer.num}"></div>
        </li>`
        }
        levelTitle.innerHTML = levels[currentLevel].title;
        levelNumber.innerHTML = levels[currentLevel].level;

        optionsContainer.innerHTML = contentOptions;
        answersContainer.innerHTML = contentAnswers;
        currentLevel++;
    };

    populateGameLevel();
    nextButton.addEventListener("click", populateGameLevel);





});



// MENÚ DESPLEGABLE

let infoMenu = () => {
    let toggle = document.querySelector('.info');
    let menu = document.querySelector('.infoMenu');
    let close = menu.querySelector('.close');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('opened');
        toggle.classList.toggle('activeButton');
    });

};







