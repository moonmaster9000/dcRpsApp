module.exports = function FakeRoundRepo(){
    let rounds = []

    this.save = function(round){
        rounds.push(round)
    }

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.findAll = function(){
        return rounds
    }
}
