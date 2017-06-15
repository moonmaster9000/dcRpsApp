const React = require("react")
const ReactDOM = require("react-dom")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {
            message: null,
            p1Throw: null
        }
    }

    submitPlayRound(){
        this.props.rps.playRound(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({message: "INVALID"})
    }

    p1Wins(){
        this.setState({message: "p1 Wins!!!!"})
    }

    p2Wins(){
        this.setState({message: "p2 Wins!!!!"})
    }

    tie(){
        this.setState({message: "tie!!!!"})
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return <div>
            {this.state.message}
            <input type="text" name="p1Throw" onInput={this.inputChanged.bind(this)}></input>
            <input type="text" name="p2Throw" onInput={this.inputChanged.bind(this)}></input>
            <button onClick={this.submitPlayRound.bind(this)}>PLAY</button>
            </div>
    }
}

describe("play form", function () {
    describe("rps tells us invalid", function () {
        beforeEach(function () {
            mountApp({
                playRound(p1Throw, p2Throw, ui){
                    ui.invalid()
                }
            })
        })
        
        it("then the UI should display 'INVALID'", function () {
            expect(page()).not.toContain("INVALID")

            submitForm()

            expect(page()).toContain("INVALID")
        })
    })

    describe("rps tells us p1 wins", function () {
        beforeEach(function () {
            mountApp({
                playRound(p1Throw, p2Throw, ui){
                    ui.p1Wins()
                }
            })
        })
        
        it("then the UI should display 'p1 Wins!!!!'", function () {
            expect(page()).not.toContain("p1 Wins!!!!")

            submitForm()

            expect(page()).toContain("p1 Wins!!!!")
        })
    })
    
    describe("rps tells us p2 wins", function () {
        beforeEach(function () {
            mountApp({
                playRound(p1Throw, p2Throw, ui){
                    ui.p2Wins()
                }
            })
        })
        
        it("then the UI should display 'p2 Wins!!!!'", function () {
            expect(page()).not.toContain("p2 Wins!!!!")

            submitForm()

            expect(page()).toContain("p2 Wins!!!!")
        })
    })
    
    describe("rps tells us tie", function () {
        beforeEach(function () {
            mountApp({
                playRound(p1Throw, p2Throw, ui){
                    ui.tie()
                }
            })
        })
        
        it("then the UI should display 'tie!!!!'", function () {
            expect(page()).not.toContain("tie!!!!")

            submitForm()

            expect(page()).toContain("tie!!!!")
        })
    })

    it("sends the user's input to the rps module", function () {
        const playRoundSpy = jasmine.createSpy("play")

        mountApp({
            playRound: playRoundSpy
        })

        fillIn("p1Throw", "p1 throw")
        fillIn("p2Throw", "p2 throw")

        submitForm()

        expect(playRoundSpy).toHaveBeenCalledWith("p1 throw", "p2 throw", jasmine.any(Object))
    })

    let domFixture

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        domFixture.remove()
    })

    function setupDOM() {
        domFixture = document.createElement("div")
        domFixture.id = "testPlayForm"
        document.querySelector("body").appendChild(domFixture)
    }

    function fillIn(inputName, inputValue) {
        let input = document.querySelector(`input[name='${inputName}']`)
        input.value = inputValue
        input.dispatchEvent(new Event("input", {bubbles: true, cancelable: false}))
    }

    function mountApp(rps) {
        ReactDOM.render(
            <PlayForm rps={rps}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }
})