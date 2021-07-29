const display = document.getElementById('result');

var stream$ = rxjs.Observable.create(function(observer) {

    let i = 0;
    (function repeat(times){
        if (++i > 15) return;

        setTimeout(function() {
            let charset = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                word = '';
            for(let i = 0; i < 5; i++) {
                word += charset[Math.round(Math.random() * (charset.length - 1))];
            }
            display.style.color = '#000000';
            
            if (checkZero(word)) {
                display.innerHTML = 'There is Zero here';    
            } else if (checkNumbers(word)) {
                display.style.color = '#090eab';
                display.innerHTML = word;    
            } else if (checkPoly(word)) {
                display.style.color = '#c90606';
                display.innerHTML = word;        
            } else {
            display.innerHTML = word;    
            }
            
            observer.next(word);
            repeat();
        }, 3000);
    })();

    function checkPoly(str) {
        let strReverse = str.split('').reverse().join('');
        if (strReverse == str) {
            return true;
        } else {
            return false;
        }
    };
    
    function checkNumbers(str) {
        let regex = /\D/g;
        return !regex.test(str);
    };

    function checkZero(str) {
        let regex = /\d[0]/g;
        return regex.test(str);
    };

});

stream$.subscribe(function(data) {
    console.log('New generated string: ', data);
});

