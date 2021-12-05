var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
function convertImgToBase64(url) {
    return new Promise(function (resolve, reject) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            resolve({ data: dataURL, width: img.width, height: img.height });

            canvas = null;
        };
        img.onerror = function (e) {
            console.log('convertImgToBase64 Error e=', e);
            resolve({ data: "" });
        }
        img.src = url;
    })
}

function get_js_resource(url) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            timeout: 60000,
        }).then(r => r.text()).then(r => {
            if (r.indexOf('},queryId:"') != -1) {
                let start = r.indexOf('},queryId:"') + 11
                let tmp = r.slice(start)
                let end = tmp.indexOf('"')
                let hash_code = tmp.slice(0, end)
                resolve(hash_code)
            } else {
                resolve("")
            }
        })
    })
}

function check_private(r) {
    let start = r.indexOf('window._sharedData = {') + 21
    let tmp = r.slice(start)
    let end = tmp.indexOf(";</script>")
    let _shareData = JSON.parse(tmp.slice(0, end))
    let uid = _shareData.entry_data.ProfilePage[0].graphql.user.id
    let postData = _shareData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges
    if (postData.length > 0) {
        return uid
    } else {
        return ""
    }
}
function get_user_id(content){
    let start = content.indexOf('window._sharedData = ')+21
    if(start == 18){
        return ""
    }else{
        let tmp = content.slice(start)
        let end = tmp.indexOf('</script>')
        tmp = tmp.slice(0,end-1)
        let data = JSON.parse(tmp)
        let uid = data.config.viewer.username
        return uid
    }
}

function get_acn(){
    return new Promise(function(resolve, reject){
        fetch(`https://www.instagram.com/`,{
            method: 'GET',
            timeout: 60000,
        }).then(r=>r.text()).then(r=>{
            let acn = get_user_id(r)
            console.log(acn)
            resolve(acn)
        }).catch(e=>{
            resolve("")
        })
    })
}

function get_hash_code(user) {
    return new Promise(function (resolve, reject) {
        console.log(`get ${user}'s hashcode`)
        fetch(`https://www.instagram.com/${user}`, {
            method: 'GET',
            timeout: 60000,
        }).then(r => r.text()).then(async r => {
            let i = 0
            let hash_code = ""
            let acn = get_user_id(r)
            if(acn.length === 0){
                resolve({
                    hash_code: "",
                    uid: "",
                    acn: ""
                })
            }
            let uid = check_private(r)
            if (uid.length) {
                while (i < $(r).length) {
                    if ($(r)[i].nodeName == 'LINK') {
                        let href = $($(r)[i]).attr('href')[0] == '/' ? `https://www.instagram.com${$($(r)[i]).attr('href')}` : $($(r)[i]).attr('href')
                        if (href.slice(-3) == '.js') {
                            let rst = await get_js_resource(href)
                            if (rst.length > 0) {
                                hash_code = rst
                                break
                            }
                        }
                    }
                    i += 1
                }
                resolve({
                    hash_code: hash_code,
                    uid: uid,
                    acn: acn
                })
            } else {
                resolve({
                    hash_code: "",
                    uid: "",
                    acn: ""
                })
            }
        })
    })
}

function get_post(uid, hash_code, token, acn) {
    return new Promise(function (resolve, reject) {
        fetch(`https://www.instagram.com/graphql/query/?query_hash=${hash_code}&variables=%7B%22id%22%3A%22${uid}%22%2C%22first%22%3A12%2C%22after%22%3A${JSON.stringify(token)}%7D`, {
            "referrer": "https://www.instagram.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        }).then(r => r.json()).then(async r => {
            console.log(r)
            let rst = []
            let i = 0
            while (i < r.data.user.edge_owner_to_timeline_media.edges.length) {
                try {
                    let item = r.data.user.edge_owner_to_timeline_media.edges[i]
                    let data = {}
                    data.acn = acn
                    data.url = `https://www.instagram.com/p/${item.node.shortcode}`
                    data.id = MD5(`${data.acn}+${data.url}`)
                    data.author_id = item.node.owner.id
                    data.author = item.node.owner.username
                    data.content = item.node.edge_media_to_caption.edges.length > 0 ? item.node.edge_media_to_caption.edges[0].node.text : ""
                    data.comment_cnt = 'edge_media_to_comment' in item.node ? item.node.edge_media_to_comment.count : 0
                    data.like_cnt = 'edge_media_preview_like' in item.node ? item.node.edge_media_preview_like.count : 0
                    data.created_time = item.node.taken_at_timestamp
                    let display_url = item.node.display_url
                    let b64_img = await convertImgToBase64(display_url)
                    if (b64_img.data.length > 0) {
                        data.img = b64_img.data
                        data.height = b64_img.height
                        data.width = b64_img.width
                    } else {
                        data.img = item.node.display_resources[0].src
                        data.height = item.node.display_resources[0].config_height
                        data.width = item.node.display_resources[0].config_width
                    }
                    if (item.node.__typename == "GraphSidecar") {
                        data.view_cnt = 0
                        data.ptype = "image"
                    } else if (item.node.__typename == "GraphImage") {
                        data.view_cnt = 0
                        data.ptype = "image"
                    } else if (item.node.__typename == "GraphVideo") {
                        data.view_cnt = item.node.video_view_count
                        data.ptype = "video"
                    }
                    rst.push(data)
                    i += 1
                } catch (e) {
                    console.log(e)
                    i += 1
                }
            }
            resolve({
                data: rst,
                next_token: r.data.user.edge_owner_to_timeline_media.page_info.end_cursor,
                has_next_page: r.data.user.edge_owner_to_timeline_media.page_info.has_next_page,
            })
        }).catch(e => {
            console.log(e)
            resolve({
                data: [],
                next_token: "",
                has_next_page: false,
            })
        });
    })
}

function save2db(posts){
    return new Promise(function(resolve, reject){
        let rec = {'posts':posts}
        $.ajax({
            url:'http://127.0.0.1:8088/data/save',
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(rec),
            success: function(data) {
                console.log("success",data);
                resolve(data)
            },
            error: function(error) {
                console.log("error:", error);
                resolve(error)
            }
        })
    })
}

(async function () {
    await get_acn()
    let user = "nancy3nike"
    let acn_info = await get_hash_code(user)
    if (acn_info.hash_code.length == 0 || acn_info.uid.length == 0) {
        console.log(`沒有取得${user}的貼文，請檢查觀看權限`)
    } else {
        let token = null
        let pCnt = 0;
        while (true) {
            let rsp = await get_post(acn_info.uid, acn_info.hash_code, token, acn_info.acn);
            let save_rsp = await save2db(rsp.data)
            pCnt += rsp.data.length
            if (rsp.has_next_page == false || pCnt > 10) {
                break
            }
            token = rsp.next_token
        }
    }
    // await get_acn()
    // user = "nienyin"
    // acn_info = await get_hash_code(user)
    // if (acn_info.hash_code.length == 0 || acn_info.uid.length == 0) {
    //     console.log(`沒有取得${user}的貼文，請檢查觀看權限`)
    // } else {
    //     let token = null
    //     let pCnt = 0;
    //     while (true) {
    //         let rsp = await get_post(acn_info.uid, acn_info.hash_code, token, acn_info.acn);
    //         let save_rsp = await save2db(rsp.data)
    //         pCnt += rsp.data.length
    //         if (rsp.has_next_page == false || pCnt > 10) {
    //             break
    //         }
    //         token = rsp.next_token
    //     }
    // }
})()

