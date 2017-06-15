const Round = require("./Round")

function Rps(roundRepo){
    this.playRound = function(p1Throw, p2Throw, observer){
        new PlayRoundRequest(p1Throw, p2Throw, observer, roundRepo).execute()
    }

    this.history = function(observer){
        if (roundRepo.isEmpty())
            observer.noRounds()
        else
            observer.rounds(roundRepo.findAll())
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer, roundRepo){
    this.execute = function(){
        if (invalid(p1Throw) || invalid(p2Throw)){
            handleInvalidRequest()
        } else if (throwsAreTheSame()){
            handleTieGame()
        } else if (p1ThrowBeatsP2Throw()){
            handleP1Wins()
        } else {
            handleP2Wins()
        }
    }

    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    const validThrows = [ROCK, PAPER, SCISSORS]

    function invalid(t) {
        return !validThrows.includes(t)
    }

    function throwsAreTheSame() {
        return p1Throw === p2Throw
    }

    function p1ThrowBeatsP2Throw() {
        return p1Throw === ROCK     && p2Throw === SCISSORS ||
            p1Throw === PAPER    && p2Throw === ROCK     ||
            p1Throw === SCISSORS && p2Throw === PAPER
    }

    function handleInvalidRequest() {
        save("invalid")
        observer.invalid()
    }

    function handleTieGame() {
        save("tie")
        observer.tie()
    }

    function handleP1Wins() {
        save("p1")
        observer.p1Wins()
    }

    function handleP2Wins() {
        save("p2")
        observer.p2Wins()
    }

    function save(result) {
        roundRepo.save(new Round(p1Throw, p2Throw, result))
    }
}

module.exports = Rps