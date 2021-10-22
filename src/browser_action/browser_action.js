(function(){
    window.onload = function(){
        $(".add_acn").on('click', function(e) {
            let acn = $('.ig_input')[0].value
            console.log(acn)
            chrome.runtime.sendMessage({
                type: 'save_acn',
                acn: acn
            }, rsp => {
                console.log(rsp)
            })
        })
    }
})()