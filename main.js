window.onload = () => {

    const numbers = document.querySelectorAll('.numbers')
    const result = document.querySelector('.current')
    const signs = document.querySelectorAll('.sign')
    const equals = document.querySelector('.equals')
    const clear = document.querySelector('.clear')
    const negative = document.querySelector('.negative')
    const percent = document.querySelector('.percent')
    const dot = document.querySelector('.dot')

    let firstValue = ''
    let isFirstValue = false
    let secondValue = ''
    let sign = ''
    let resultValue = 0

    for(let i = 0; i < numbers.length; i++){
        numbers[i].addEventListener('click',(e) =>{
                sign_fade()
                let atr = e.target.getAttribute('value')

                if(isFirstValue === false){
                    getFirstValue(atr)
                }else{
                    getSecondValue(atr)
                }
        })
    }

    function getFirstValue(el) {
        if( parseInt(el)>=0 && parseInt(el)<=9 ){
            firstValue += el
            result.innerHTML = firstValue
        }else{
            return
        }
    }

    function getSecondValue(el) {
        if(firstValue != '' && sign != ''){
            if( parseInt(el)>=0 && parseInt(el)<=9 ){
                secondValue += el
                result.innerHTML = secondValue
            }
        }
        if(sign === ''){
            firstValue = ''
            resultValue = 0
            getFirstValue(el)
        }
    }

    function getSign(){
        for(let i = 0; i < signs.length; i++){
            signs[i].addEventListener('click',(e) =>{
                sign = e.target.getAttribute('value')
                isFirstValue = true
                firstValue = +firstValue

                //連加
                if(secondValue != ''){
                    if(sign === '+'){
                        resultValue = firstValue + +secondValue
                    }else if(sign === '-'){
                        resultValue = firstValue - +secondValue
                    }else if(sign === 'x'){
                        resultValue = firstValue * +secondValue
                    }else if(sign === '÷'){
                        resultValue = firstValue / +secondValue
                    }
                    result.innerHTML = resultValue
                    firstValue = resultValue
                    secondValue = ''
                }

            })
        }
    }
    getSign()

    $("document").ready(function(){
        origin_b = 'rgba(255,255,255, .75)'
        origin_c = 'rgba(0,0,0, .9)'

        after_b = 'rgba(0,0,0, .9)'
        after_c = 'rgba(255,255,255, .9)'

        $('#division').click(function(){
            $('#division').css('background',after_b)
            $('#division').css('color',after_c)

            $('#multiplication').css('background',origin_b)
            $('#multiplication').css('color',origin_c)
            $('#addition').css('background',origin_b)
            $('#addition').css('color',origin_c)
            $('#subtraction').css('background',origin_b)
            $('#subtraction').css('color',origin_c)
        })

        $('#multiplication').click(function(){
            $('#multiplication').css('background',after_b)
            $('#multiplication').css('color',after_c)

            $('#division').css('background',origin_b)
            $('#division').css('color',origin_c)
            $('#addition').css('background',origin_b)
            $('#addition').css('color',origin_c)
            $('#subtraction').css('background',origin_b)
            $('#subtraction').css('color',origin_c)
        })

        $('#addition').click(function(){
            $('#addition').css('background',after_b)
            $('#addition').css('color',after_c)

            $('#division').css('background',origin_b)
            $('#division').css('color',origin_c)
            $('#multiplication').css('background',origin_b)
            $('#multiplication').css('color',origin_c)
            $('#subtraction').css('background',origin_b)
            $('#subtraction').css('color',origin_c)
        })

        $('#subtraction').click(function(){
            $('#subtraction').css('background',after_b)
            $('#subtraction').css('color',after_c)

            $('#division').css('background',origin_b)
            $('#division').css('color',origin_c)
            $('#multiplication').css('background',origin_b)
            $('#multiplication').css('color',origin_c)
            $('#addition').css('background',origin_b)
            $('#addition').css('color',origin_c)
        })

    })

    function sign_fade(){
        $("document").ready(function(){
            origin_b = 'rgba(255,255,255, .75)'
            origin_c = 'rgba(0,0,0, .9)'
    
            after_b = 'rgba(0,0,0, .9)'
            after_c = 'rgba(255,255,255, .9)'

            $('#division').css('background',origin_b)
            $('#division').css('color',origin_c)
            $('#multiplication').css('background',origin_b)
            $('#multiplication').css('color',origin_c)
            $('#addition').css('background',origin_b)
            $('#addition').css('color',origin_c)
            $('#subtraction').css('background',origin_b)
            $('#subtraction').css('color',origin_c)

            })
    }

    equals.addEventListener('click',() =>{
        if(resultValue == 0 && firstValue === '' && sign === '' && secondValue === ''){
            alert('Please enter a number')

            firstValue = ''
            isFirstValue = false
            secondValue = ''
            
            sign = ''
            resultValue = 0
        }else{
            sign_fade()
            result.innerHTML = ''
            if(sign === '+'){
                resultValue = firstValue + +secondValue
            }else if(sign === '-'){
                resultValue = firstValue - +secondValue
            }else if(sign === 'x'){
                resultValue = firstValue * +secondValue
            }else if(sign === '÷'){
                resultValue = firstValue / +secondValue
            }
            result.innerHTML = resultValue
            firstValue = resultValue
            secondValue = ''
            sign = ''

            checkResultLength()
        }
        
    })

    function checkResultLength() {
        //JSON.stringify() -> convert variable to string
        resultValue = JSON.stringify(resultValue)

        //JSON.parse() -> convert the string back to a number
        //to.Fixed() -> 限制小數點後幾位
        if(resultValue.length > 8){
            resultValue = JSON.parse(resultValue)
            result.innerHTML = resultValue.toFixed(5)
        }
    }

    negative.addEventListener('click',() =>{
        sign_fade()
        result.innerHTML = ''
        if(firstValue != ''){
            resultValue = -firstValue
            firstValue = resultValue
        }
        if(firstValue != '' && secondValue != '' && sign != ''){
            resultValue = -resultValue
        }

        result.innerHTML = resultValue
    })

    percent.addEventListener('click',() =>{
        sign_fade()
        result.innerHTML = ''
        if(firstValue != ''){
            resultValue = firstValue / 100
            firstValue = resultValue
        }
        if(firstValue != '' && secondValue != '' && sign != ''){
            resultValue = resultValue / 100
        }

        result.innerHTML = resultValue
    })

    clear.addEventListener('click',() =>{
        sign_fade()
        result.innerHTML = 0

        firstValue = ''
        isFirstValue = false
        secondValue = ''
        
        sign = ''
        resultValue = 0
    })

    dot.addEventListener('click',() =>{
        sign_fade()

        //check there exist a dot in resultValue or not
        let check_first = firstValue.toString()
        let check_second = secondValue.toString()
        let check_result = resultValue.toString()

        if(check_first.includes('.') && check_second === ''){
            return
        }
        if(check_second.includes('.')){
            return
        }

        if(!check_result.includes('.')){
            resultValue = firstValue + '.'
            firstValue = resultValue
        }else if(firstValue != ''){
            resultValue = secondValue + '.'
            secondValue = resultValue
        }

        result.innerHTML = resultValue
    })

}
