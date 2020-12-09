function generate(flag) {
    if(flag == 0){
        var sectionTag = document.getElementById('outputContainer');
        sectionTag.style.display = 'none';
    }

    var rawDictContents = new Map();
    var rawDictFilepaths = [6];
    rawDictFilepaths[0] = '/IndieBandNameGenerator/words/adjectives.txt';
    rawDictFilepaths[1] = '/IndieBandNameGenerator/words/firstfemalenames.txt';
    rawDictFilepaths[2] = '/IndieBandNameGenerator/words/firstmalenames.txt';
    rawDictFilepaths[3] = '/IndieBandNameGenerator/words/lastnames.txt';
    rawDictFilepaths[4] = '/IndieBandNameGenerator/words/nouns.txt';
    rawDictFilepaths[5] = '/IndieBandNameGenerator/words/verbs.txt';

    var filesLoaded = 0;
    for(var i=0; i<rawDictFilepaths.length; i++){
        fetch(rawDictFilepaths[i]).then( r => r.text()).then(function(text){
            var key = 'null';
            if(text.startsWith('**adjectives')){
                key = 'adj';
            } else if(text.startsWith('**firstfemalenames')){
                key = 'fname';
            } else if(text.startsWith('**firstmalenames')){
                key = 'mname';
            } else if(text.startsWith('**lastnames')){
                key = 'sname';
            } else if(text.startsWith('**nouns')){
                key = 'noun';
            } else if(text.startsWith('**verbs')){
                key = 'verb';
            }
            rawDictContents.set(key,text);
            filesLoaded++;
            if(filesLoaded == rawDictFilepaths.length){
                return generateBandnames(rawDictContents,flag);
            }
        });
    }

}
function generateBandnames(rawDictContents,flag){
    var numberOfNames = 0;
    if(flag > 0){
        numberOfNames = flag;
    } else {
        numberOfNames = document.getElementById('numberOfNames').value
    }
    var arrAdj = rawDictContents.get('adj').split('\n');
    var arrFName = rawDictContents.get('fname').split('\n');
    var arrMName = rawDictContents.get('mname').split('\n');
    var arrSName = rawDictContents.get('sname').split('\n');
    var arrNoun = rawDictContents.get('noun').split('\n');
    var arrVerb = rawDictContents.get('verb').split('\n');

    var grammars = [];
    grammars.push('AdjNoun');
    grammars.push('Adj Noun');
    grammars.push('The Adj Nouns');
    grammars.push('Noun Noun');
    grammars.push('First Last & the Adj Nouns');
    grammars.push('Adj Noun and the Adj Nouns');
    grammars.push('Adj Last');
    grammars.push('The Nouns');
    grammars.push('Noun of Nouns');
    grammars.push('Noun');
    grammars.push('Verb the Noun');
    grammars.push('The Noun Boys');

    var output = '';
    for(var i=0; i<numberOfNames; i++){
        output = (i > 0) ? output + '\n' : output;

        var currGrammar = grammars[getRandomInt(grammars.length)];
        var adj1 = arrAdj[getRandomInt(arrAdj.length)].trim();
        var adj2 = arrAdj[getRandomInt(arrAdj.length)].trim();
        var noun1 = arrNoun[getRandomInt(arrNoun.length)].trim();
        var noun2 = arrNoun[getRandomInt(arrNoun.length)].trim();
        var verb = arrVerb[getRandomInt(arrVerb.length)].trim();
        var fname = arrFName[getRandomInt(arrFName.length)].trim();
        var mname = arrMName[getRandomInt(arrMName.length)].trim();
        var sname = arrSName[getRandomInt(arrSName.length)].trim();

        var bandname = '';
        if(currGrammar === 'AdjNoun' || currGrammar === 'Adj Noun' ){
            bandname += adj1 + ' ' + noun1;
        } else if(currGrammar === 'The Adj Nouns'){
            bandname += 'The ' + adj1 + ' ' + noun1 + 's';
        } else if(currGrammar === 'Noun Noun'){
            bandname += noun1 + ' ' + noun2;
        } else if(currGrammar === 'First Last & the Adj Nouns'){
            bandname += (randBool() ? fname : mname) + '' + (randBool() ? ' ' + sname : '');
            bandname += ' & the ';
            bandname += adj1 + ' ' + noun1 + 's';
        } else if(currGrammar === 'Adj Noun and the Adj Nouns'){
            bandname += adj1 + ' ' + noun1;
            bandname += ' & the ';
            bandname += adj2 + ' ' + noun2 + 's';
        } else if(currGrammar === 'Adj Last'){
            bandname += adj1 + ' ' + sname;
        } else if(currGrammar === 'The Nouns'){
            bandname += 'The ' + noun1 + 's';
        } else if(currGrammar === 'Noun of Nouns'){
            bandname += noun1 + ' of ' + noun2 + 's';
        } else if(currGrammar === 'Noun'){
            bandname += noun1;
        } else if(currGrammar === 'Verb the Noun'){
            bandname += verb + ' the ' + noun1 + (randBool() ? 's' : '');
        } else if(currGrammar === 'The Noun Boys'){
            bandname += 'The ' + noun1 + ' Boys';
        }
        bandname = bandname.replace(/[\n\r]/g, ' ').trim();
        output = output + bandname;
    }

    if(flag > 0){
        var apiTag = document.getElementById('api');
        apiTag.innerHTML = output;
    } else {
        var codeTag = document.getElementById('textOutput');
        codeTag.innerHTML = output;
        var sectionTag = document.getElementById('outputContainer');
        sectionTag.style.display = 'block';
    }
    return output;
}

function getRandomInt(max) {
    var rand = Math.floor(Math.random() * Math.floor(max));
    if(rand == 0){
        return rand + 1;
    }
    return rand;
}

function randBool(){
    var randInt = Math.floor(Math.random() * Math.floor(2));
    return randInt == 1;
}