function Rps(){
    this.play = function(p1, p2, ui){
        new PlayRequest(p1, p2, ui).execute()
    }
}

function PlayRequest(p1, p2, ui){
    this.execute = function(){
        if (invalid(p1) || invalid(p2))
            ui.invalid()
        else if (shapesAreTheSame())
            ui.tie()
        else if (p1BeatsP2()
        )
            ui.p1Wins()
        else
            ui.p2Wins()
    }

    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    const validThrows = [ROCK, PAPER, SCISSORS]

    function invalid(t) {
        return !validThrows.includes(t)
    }

    function shapesAreTheSame() {
        return p1 === p2
    }

    function p1BeatsP2() {
        return p1 === ROCK     && p2 === SCISSORS ||
               p1 === PAPER    && p2 === ROCK     ||
               p1 === SCISSORS && p2 === PAPER
    }
}

describe("play", function () {
    let rps

    beforeEach(function () {
        rps = new Rps()
    })
    
    describe("p1 win scenarios", function () {
        let ui
        
        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p1Wins"])
        })
        
        it("rock v scissors", function () {
            rps.play("rock", "scissors", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            rps.play("paper", "rock", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            rps.play("scissors", "paper", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })
    })

    describe("p2 win scenarios", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p2Wins"])
        })
        
        it("scissors v rock", function () {
            rps.play("scissors", "rock", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            rps.play("rock", "paper", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            rps.play("paper", "scissors", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })
        
        it("rock v. rock", function () {
            rps.play("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
        
        it("paper v. paper", function () {
            rps.play("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
        
        it("scissors v. scissors", function () {
            rps.play("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })


    describe("invalid throws", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("rock v. [invalid throw]", function () {
            rps.play("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid throw v. rock", function () {
            rps.play(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid v. same invalid", function () {
            rps.play("sailboat", "sailboat", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })
})