let gameNum = 0;
let chance = 5;
let goBtn = document.getElementById("play");
let userInput = document.getElementById("user-input");
let Result = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let Reset = document.getElementById("reset");
let renewer = [];

//랜덤번호 지정
function comNum() {
    gameNum = Math.floor(Math.random() * 100) + 1;

    console.log("정답", gameNum);
}

//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
goBtn.addEventListener("click", play);
Reset.addEventListener("click", reset);

function play() {
    let userValue = userInput.value;
    // 유저가 범위 밖의 숫자를 입력하면 알려준다. (기회를 깎지 않음)
    if(isNaN(userValue) || userValue < 1 || userValue > 100) {
        Result.textContent = "1부터 100까지의 숫자를 입력해주세요!"
        return;
    }

    // 유저가 이미 입력한 숫자를 또 입력하면 알려준다. (기회를 깎지 않음)
    if(renewer.includes(userValue)) {
        Result.textContent = "이미 입력한 숫자 입니다."
        return;
        // 유저 입력값중에 같은 수가 있는지 검사 후 출력
    }
    renewer.push(userValue);
    chance --;
    console.log(renewer)

    // 만약 유저가 랜덤 번호를 맞추면, 맞췄습니다!
    // 랜덤번호가 < 유저번호 Down!
    // 랜덤번호가 > 유저번호 Up!
    if(userValue == gameNum) {
        Result.textContent = "맞췄습니다!"
        goBtn.disabled = true;
        userInput.disabled = true;
        return;
    } else if(userValue < gameNum) {
        Result.textContent = "Up!!!"
    } else if(userValue > gameNum) {
        Result.textContent = "Down!!!"
    }
    // 5번의 기회를 다 쓰면 게임이 끝난다. (더이상 추측 불가, 버튼 비활성화)
    if(chance === 0 ) {
        Result.textContent = `게임오버! 정답은 ${gameNum} 입니다!`
        goBtn.disabled = true;
        userInput.disabled = true;
        return;
    } else {
        chanceArea.textContent = `남은 기회 : ${chance} 번!`
    }
}

function reset() {
    // Reset버튼을 누르면 게임 리셋
    userInput.value = "";
    // 유저 인풋  초기화
    renewer = [];
    // 유저 입력값 초기화
    comNum();
    // 새로운 번호 생성
    goBtn.disabled = false;
    userInput.disabled = false;
}


comNum()