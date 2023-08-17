const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let ran = random()

console.log("게임을 시작 하겠습니다")

let cnt = 1
rl.question('저와 대전하실 분의 이름은 무엇인가요?  ', (name) => {
    console.log(`반갑습니다, ${name}님!
3자리 숫자가 생성되었습니다!!

생각하시는 숫자를 입력해주세요!`);
    game()
});


// 터미널 입력 종료
rl.on('close', () => {
    process.exit();
})


// 랜덤한 3자리 수 만들기
function random() {
    // ? 랜덤으로 3자리 수 만들기
    let ran = parseInt(Math.random() * 1000)
    let ranS
    console.log("bf-if", ran)

    // ? 만든 숫자가 3자리 수 미만이면 다시 만들기
    if (ran < 100) { return random() }

    // ? 각 자리의 수 중에서 숫자의 값이 같을 경우 다시 만들기
    ranS = String(ran)
    if (ranS[0] == ranS[1] || ranS[0] == ranS[2] || ranS[1] == ranS[2]) { return random() }
    return ranS
}

// 게임 시작 함수
function game() {
    rl.on("line", (user) => {

        // * 사용자가 값을 잘못 넣으면 정정하기.
        // ? 3자리가 아닐 경우
        if (user.length < 3 || user.length > 3) {
            cnt = cnt + 1
            console.log("3자리 숫자기 아닙니다. 다시 적어주세요.")
            return game

            // ? 같은 숫자가 있을 경우
        } else if (user[0] == user[1] || user[0] == user[2] || user[1] == user[2]) {
            cnt = cnt + 1
            console.log("같은 숫자를 2번 이상 넣으셨습니다. 다시 적어주세요.")
            return game
        }

        // * 본 게임
        // ? 맞추면 정답과 반복회수를 말하고 종료.
        if (user === ran) {
            console.log(`정답입니다. ${cnt} 번 반복하셨습니다`)

            // rl.question("계속하시겠어요? (yes/n)", (answer) => {
            //     return answer === "yes" ? game && random : rl.close(); // y면 다시 질문하기, 아니면 닫기
            // });
            return rl.close();

            // ? 입력한 숫자에 따라 S 및 B 를 보여주는 로직.    
        } else if (user !== ran) {
            cnt = cnt + 1
            let strikes = 0;
            let balls = 0;

            // ? 스트라이크와 볼 확인
            for (let i = 0; i < 3; i++) {
                const user1 = user[i];

                if (user1 === ran[i]) {
                    strikes++;
                } else if (ran.includes(user1)) {
                    balls++;
                }
            }

            // ? 스트라이크와 볼 결과 출력
            if (strikes > 0 || balls > 0) {
                console.log(`${strikes ? strikes + "S" : ""}${balls ? balls + "B" : ""}`)
                return game;
            } else {
                console.log("파울")
                return game;
            }
        }
    });
}