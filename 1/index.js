module.exports = function ({ participants, sports }) {
    /**  
     * Подобно оператору new создает экземпляр объекта,  
     * используя функцию-конструктор и параметры для нее  
     */
    function constructFrom(fnConstructor, params) {
        const res = {};

        fnConstructor.bind(res).call(res, ...params);

        Object.setPrototypeOf(res, fnConstructor.prototype);

        return res;
    }

    /**  
     * Создает пары вида [’вид спорта’, ’имя участника’],  
     * где первому виду спорта соответствует последний участник  
     */
    function assignParticipants() {
        const participants = this.participants;
        const sports = this.sports;
        const orderIndexes = [];

        for (let i = sports.length; i--; i >= 0) {
            orderIndexes.push(function () {
                return i;
            });
        }

        return orderIndexes.map(
            (getSportIndex, i) => [sports[i], participants[getSportIndex()]]
        );
    }

    function Contest(participants, sports) {
        this.participants = participants;
        this.sports = sports;
    }

    Contest.prototype.assignParticipants = assignParticipants;

    const contest = constructFrom(Contest, [participants, sports]);

    return contest.assignParticipants();
}