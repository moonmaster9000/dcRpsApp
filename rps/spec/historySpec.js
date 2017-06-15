const Rps = require("../src/Rps")
const Round = require("../src/Round")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    let roundRepo, rps

    beforeEach(function () {
        roundRepo = new FakeRoundRepo()
        rps = new Rps(roundRepo)
    })

    describe("when no rounds have been played", function () {
        it("tells the UI noRounds", function () {
            let observerSpy = jasmine.createSpyObj("observerSpy", ["noRounds"])

            rps.history(observerSpy)

            expect(observerSpy.noRounds).toHaveBeenCalled()
        })
    })

    describe("when some rounds have been played", function () {
        it("sends the rounds to the UI", function () {
            let observerSpy = jasmine.createSpyObj("observerSpy", ["p2Wins", "p1Wins", "tie", "invalid", "rounds"])

            rps.playRound("rock", "paper", observerSpy)
            rps.playRound("paper", "rock", observerSpy)
            rps.playRound("rock", "rock", observerSpy)
            rps.playRound("rock", "sailboat", observerSpy)

            rps.history(observerSpy)

            expect(observerSpy.rounds).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2"),
                new Round("paper", "rock", "p1"),
                new Round("rock", "rock", "tie"),
                new Round("rock", "sailboat", "invalid")
            ])
        })

    })
})

function roundRepoContract(roundRepoClass){
    describe("round repo", function () {
        let roundRepo

        beforeEach(function () {
            roundRepo = new roundRepoClass()
        })

        describe("when no rounds have been saved", function () {
            it("is empty", function () {
                expect(roundRepo.isEmpty()).toBe(true)
            })
        })

        describe("when rounds have been saved", function () {
            it("is not empty", function () {
                roundRepo.save(new Round())

                expect(roundRepo.isEmpty()).toBe(false)
            })

            it("returns the saved rounds in findAll", function () {
                const roundA = new Round("A")
                const roundB = new Round("B")

                roundRepo.save(roundA)
                roundRepo.save(roundB)

                expect(roundRepo.findAll()).toContain(roundA, roundB)
            })
        })
    })
}

roundRepoContract(FakeRoundRepo)