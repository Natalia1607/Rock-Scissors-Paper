window.addEventListener('load', function () {
    let countUser = document.querySelector('.count-user'),
        countComp = document.querySelector('.count-comp');

    let userField = document.querySelector('.user-field'),
        compField = document.querySelector('.comp-field'),
        fields = document.querySelectorAll('.field');

    let sound = document.querySelector('.sound'),
        play = document.querySelector('.play'),
        result = document.querySelector('.result');

    let userStep,
        compStep,
        countU = 0,
        countC = 0,
        blocked = false;
    
    function choiceUser(event) {
        if(blocked) return; //Blocking buttons while the computer makes a choice
        let target = event.target;
        if(target.classList.contains('field')) {
            userStep = target.dataset.field;
            fields.forEach(item => {
                item.classList.remove('active', 'error');
            });
            target.classList.add('active');
            choiceComp();
        }
    }

    function choiceComp() {
        blocked = true;
        let random = Math.floor(Math.random() * 3); //We limit the random number within the limits from 1 to 3
        compField.classList.add('blink');
        let compFields = compField.querySelectorAll('.field');

        setTimeout(() => {
            compField.classList.remove('blink');
            compStep = compFields[random].dataset.field;
            compFields[random].classList.add('active');
            winner();
        },3000);
    }

    function winner() {
        blocked = false;

        let comb = userStep + compStep;

        switch (comb) {
            case 'rockrock':
            case 'scissorsscissors':
            case 'paperpaper':
                result.innerText = "Draw!";
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play();
                break;
            
            case 'rockscissors':
            case 'scissorspaper':
            case 'paperrock':
                result.innerText = "You won!";
                sound.setAttribute('src', 'audio/win.mp3');
                sound.play();
                countU++;
                countUser.innerText = countU;
                compField.querySelector('[data-field='+compStep+']').classList.add('error');
                break;

            case 'scissorsrock':
            case 'paperscissors':
            case 'rockpaper':
                result.innerText = "You lose!";
                sound.setAttribute('src', 'audio/loss.mp3');
                sound.play();
                countC++;
                countComp.innerText = countC;
                userField.querySelector('[data-field='+userStep+']').classList.add('error');
                break;
        }
    }

    function playGame() {
        countU = countC = 0;
        result.innerText = 'Make a choice!';
        countUser.innerText = '0';
        countComp.innerText = '0';
        fields.forEach(item => {
            item.classList.remove('active', 'error');
        });
    }

    play.addEventListener('click', playGame);
    userField.addEventListener('click', choiceUser);
});