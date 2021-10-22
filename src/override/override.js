(function(){
    function format_time(timestamp){
        var date_not_formatted = new Date(timestamp);

        var formatted_string = date_not_formatted.getFullYear() + "-";

        if (date_not_formatted.getMonth() < 9) {
            formatted_string += "0";
        }
        formatted_string += (date_not_formatted.getMonth() + 1);
        formatted_string += "-";

        if(date_not_formatted.getDate() < 10) {
            formatted_string += "0";
        }
        formatted_string += date_not_formatted.getDate();
        return formatted_string
    }
    function create_block(data){
        return `<div class="col">
                    <div class="card h-100">
                    <img src="${data.img}" style="height:214px;width:318px" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${data.author}</h5>
                        <p class="card-text">${data.content.slice(0,45)}</p>
                        <div style="float:left;width:100px">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB40lEQVRYhe3XP2sUYRDH8Y+J3CVaqEWwUUGLFIoIplQQwcpWtLYRTCMEsVELCyO+A7HwJUgsrCJI5FCwsbI6VIj/TWEiFtEgOYtnV9fn9nK37t7a+IWnuNnnmRlmfjv7HOWZwDJeYgabKvBZiGu4jSk8w9U6g4/jIyaT3/uEaozVlcA05iLbe+ytI/gI2jiSsW3BVzVV4BSeRrYTaBVxMlIigYu4GdmOYaGEz4E5Krx2o5G9JVRh6MzhfGRL+7912MEnsZQTqHD/szxGp8/6jnncFYZPlvYA52NfD7AnddAZIMkGLuObMH7LkPqajxNoJ6sXTayVDJ4yjtU4gUEosncjTuJ57HRat7qrTuAS7uEzjseDaEwozTD5gVeClgqJ8G/2bsQUFmOn/URYZQITWElvLx2D32SK7M2jgQPCLHmXdUo9InyR+LiDxr8Q4X5cwS6ZmVK3CJvCW9B1HxhEhFVwEB+yhroqcEjo/RJO012BWIQ38BazJYJm6Qh9X8eT+AHhj8VMxv46SXIxZ28ZbuFCXgIxs3iD6xUm0MQjnOH3QEmHSyrAye5zvw6v4rDQmlFs77F2YFuOfSfu4yzWi0zChvAlOycoeDc2Y6XHWsaXHPun5NkftPS/Rq3hYRL4P5XxEy3WkeDUP3AhAAAAAElFTkSuQmCC"
                            />
                            ${data.like_cnt}
                        </div>
                        <div style="float:left;width:100px">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAA1UlEQVRYhe3WT0oDMRSA8R8eoW7EXXeCx/EEdlvqKayil+jKK/QopQy47EJwWzCrumh1JJ0ZWtqkFfJBNvn3vuQl8CgUap4QsErcAsZNAgG9FCeLuMRX08AqQ/CtWBcZgzZSBIrALgKV3f94Fa2p4s26KN+wjX1SEKdiL0oKisDZCPy84NGmpejrFDgZwbpaSU1rRTR2eE34HO350TAn4PGIB/rlCp+4/dO3QD9FsDbuMd/IwBR3OQXgFTPc4AGT3AIwtE7HG5bqG8nKNV7wjsEpBP4H33ufbRk7JCnFAAAAAElFTkSuQmCC"/>
                            ${data.comment_cnt}
                        </div>
                        <a href="${data.url}" class="btn btn-primary">查看貼文</a>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${format_time(data.created_time)}</small>
                        </div>
                    </div>
                </div>`
    }
    window.onload = function(){
        $(".query").on('click', function(e) {
            let keyword = $('.keyword')[0].value
            console.log(keyword)
            chrome.runtime.sendMessage({
                type: 'query_data',
                key_word: keyword
            }, rsp => {
                console.log(rsp)
                $('.result').html("")
                rsp.forEach(item=>{
                    let tmp = create_block(item)
                    $( ".result" ).append(tmp);
                })
            })
        })
    }
})()