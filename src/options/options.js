(function(){
    function create_block(i,acn){
        return `
        <tr>
            <th scope="row">${i+1}</th>
            <td>${acn}</td>
            <td>
              <img
                class="delete"
				data-id="${acn}"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABCUlEQVRYhe3WPUoDURTF8Z9hsBEUEXsLdyD2FunFRYhNWnErguIWBFv34AY0IIpfhR/Y+EFQi4QUg8/35pkwkMwfXnPv3MPhzZnL0DDtzGTMFNjCYqn+jGP0/msqxhHe0C2d90Fv7Nyi80u9g5uqYkWgvoZ2oDePDcyV6utYwF5g7hRn5WIoA9vYCfRy2cfhiDUngJTPcBUrmfqXuMicHbKL78wTCuSQVoKBqxzXA+7rNnBXt4HoDaTQwoe8DCyniMf40l+/VenhcRQGyHsND/rmazMQDeC4DSQFMNXAdYaBybqBJgOveKloIGd3/MmB9A14jtkU0Sq/5QU2sRR57hMneKqg3TDF/AAv7Vg/yxbwmwAAAABJRU5ErkJggg=="
              />
            </td>
          </tr>`
    }
    window.onload = function(){
        chrome.runtime.sendMessage({
            type: 'query_user',
        }, rsp => {
            console.log(rsp)
            $('tbody').html("")
            rsp.forEach((item,idx)=>{
                let tmp = create_block(idx,item.acn)
                $( "tbody" ).append(tmp);
            })
        })
        $(document).on('click','.delete', function(e) {
            chrome.runtime.sendMessage({
                type: 'del_user',
                acn: $(e.target).data('id')
            }, rsp => {
                console.log(rsp)
                $(e.target.parentNode.parentNode).remove()
            })
        })
    }
})()