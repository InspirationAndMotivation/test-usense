const display = document.getElementById('result');

var stream$ = rxjs.Observable.create(function(observer) {

    let i = 0;
    (function repeat(times){
        ++i;

        setTimeout(function() {
            let charset = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                word = '';
            for(let i = 0; i < 5; i++) {
                word += charset[Math.round(Math.random() * (charset.length - 1))];
            }

            let settingColor = check(word);
            if (settingColor) {
                display.style.color = settingColor;
                display.innerHTML = word;    
            } else {
                display.style.color = '#000000';
                display.innerHTML = 'There is Zero here';    
            }
            
            observer.next(word);
            repeat();
        }, 3000);
    })();

    function check(str) {
        if (str.indexOf("0") !== -1) {
            return;
        }

        let strReverse = str.split('').reverse().join('');
        if (strReverse == str) {
            return '#c90606';
        } else if (!/\D/g.test(str)) {
            return '#090eab';
        } else {
            return '#000000';
        }
    };

});

stream$.subscribe(function(data) {
    console.log('New generated string: ', data);
});

