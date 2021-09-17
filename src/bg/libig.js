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

function get_hash_code(user) {
    return new Promise(function (resolve, reject) {
        console.log(`get ${user}'s hashcode`)
        fetch(`https://www.instagram.com/${user}`, {
            method: 'GET',
            timeout: 60000,
        }).then(r => r.text()).then(async r => {
            let i = 0
            let hash_code = ""
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
                    uid: uid
                })
            } else {
                resolve(resolve({
                    hash_code: "",
                    uid: ""
                }))
            }
        })
    })
}

function get_post(uid, hash_code, token) {
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
                    data.url = `https://www.instagram.com/p/${item.node.shortcode}`
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
                        data.type = "image"
                    } else if (item.node.__typename == "GraphImage") {
                        data.type = "image"
                    } else if (item.node.__typename == "GraphVideo") {
                        data.view_cnt = item.node.video_view_count
                        data.type = "video"
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
(async function () {
    let user = "eric0330eric"
    let acn_info = await get_hash_code(user)
    if (acn_info.hash_code.length == 0 || acn_info.uid.length == 0) {
        console.log(`沒有取得${user}的貼文，請檢查觀看權限`)
    } else {
        let token = null
        while (true) {
            let rsp = await get_post(acn_info.uid, acn_info.hash_code, token);
            console.log(rsp.data)
            if (rsp.has_next_page == false) {
                break
            }
            token = rsp.next_token
        }
    }
})()

