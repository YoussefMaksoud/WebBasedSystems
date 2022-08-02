// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    // you need to write your own code here

    let nChars = txt.length;
    let nWords = 0;
    
    let nLines = 0;
    let nNonEmptyLines = nLines;
    let averageWordLength = 0;
    let maxLineLength = 0;
    let tenLongestWords = [];
    let tenMostFrequentWords = [];

    let longest_word = 0;
    let word_arr = []
    let total_word_len = 0;
    let line_arr = txt.split("\n");

    let occurences = new Map();
    
    if(nChars > 0 && txt != "\n"){

        nChars = txt.length;
        nLines = line_arr.length;
        nNonEmptyLines = nLines;

        for(let i =0; i < line_arr.length; i++){
            if(line_arr[i].length > maxLineLength){
                maxLineLength = line_arr[i].length;
            }
            if(line_arr[i] == ""){
                nNonEmptyLines --;
            }
        }

        if(line_arr[line_arr.length - 1] == ""){
            nLines --;
        }

        for(let i = 0; i < line_arr.length; i++){
            let temp = line_arr[i].split(" ");
            for(let j = 0; j < temp.length; j++){
                if(temp[j].length > longest_word){
                    longest_word = temp[j].length;
                }
                word_arr.push(temp[j]);
                total_word_len += temp[j].length;
            }
        }

        for(let i = longest_word; longest_word > 0; longest_word--){
            for(let j = 0; j < word_arr.length; j++){
                if(word_arr[j].length == longest_word && word_arr[j] != tenLongestWords[tenLongestWords.length - 1]){
                    tenLongestWords.push(word_arr[j]);
                }
            }
            if(tenLongestWords.length >= 10){
                break;
            }
        }

        nWords = word_arr.length;

        if(word_arr[word_arr.length - 1] == ""){
            nWords--;
        }

        averageWordLength = total_word_len/nWords;

        let temp_arr = [];
        let temp_count = [];
        let largest_occurence = 0;

        for(let i = 0; i < word_arr.length; i++){
            if(temp_arr.includes(word_arr[i]) == false){
                temp_arr.push(word_arr[i]);
                temp_count.push(1);
            }else{
                let ind = temp_arr.indexOf(word_arr[i]);
                temp_count[ind]++;
                if(temp_count[ind] > largest_occurence){
                    largest_occurence = temp_count[ind];
                }
            }
        }

        for(let i = largest_occurence; i > 0; i--){
            for(let j = 0; j < temp_arr.length; j++){
                if(temp_count[j] == i){
                    tenMostFrequentWords.push(temp_arr[j]);
                    if(tenMostFrequentWords.length >= 10){
                        break
                    }
                }
            }
        }
    }

    return {
        nChars: nChars,                                                     
        nWords: nWords,
        nLines: nLines,
        nNonEmptyLines: nNonEmptyLines,
        averageWordLength: averageWordLength,
        maxLineLength: maxLineLength,
        tenLongestWords: tenLongestWords,
        tenMostFrequentWords: tenMostFrequentWords
    };

}
