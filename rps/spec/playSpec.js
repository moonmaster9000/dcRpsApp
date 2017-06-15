function Rps(){
    this.playRound = function(p1Throw, p2Throw, observer){
        new PlayRoundRequest(p1Throw, p2Throw, observer).execute()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer){
    this.execute = function(){
        if (invalid(p1Throw) || invalid(p2Throw))
            observer.invalid()
        else if (throwsAreTheSame())
            observer.tie()
        else if (p1ThrowBeatsP2Throw())
            observer.p1Wins()
        else
            observer.p2Wins()
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
}

describe("playRound", function () {
    let rps

    beforeEach(function () {
        rps = new Rps()
    })
    
    describe("p1 win scenarios", function () {
        let observer
        
        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p1Wins"])
        })
        
        it("rock v scissors", function () {
            rps.playRound("rock", "scissors", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            rps.playRound("paper", "rock", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            rps.playRound("scissors", "paper", observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })
    })

    describe("p2 win scenarios", function () {
        let observer

        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["p2Wins"])
        })
        
        it("scissors v rock", function () {
            rps.playRound("scissors", "rock", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            rps.playRound("rock", "paper", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            rps.playRound("paper", "scissors", observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie", function () {
        let observer

        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["tie"])
        })
        
        it("rock v. rock", function () {
            rps.playRound("rock", "rock", observer)

            expect(observer.tie).toHaveBeenCalled()
        })
        
        it("paper v. paper", function () {
            rps.playRound("paper", "paper", observer)

            expect(observer.tie).toHaveBeenCalled()
        })
        
        it("scissors v. scissors", function () {
            rps.playRound("scissors", "scissors", observer)

            expect(observer.tie).toHaveBeenCalled()
        })
    })


    describe("invalid throws", function () {
        let observer

        beforeEach(function () {
            observer = jasmine.createSpyObj("observer", ["invalid"])
        })

        it("rock v. [invalid throw]", function () {
            rps.playRound("rock", Math.random(), observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("invalid throw v. rock", function () {
            rps.playRound(Math.random(), "rock", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })

        it("invalid v. same invalid", function () {
            rps.playRound("sailboat", "sailboat", observer)

            expect(observer.invalid).toHaveBeenCalled()
        })
    })
})