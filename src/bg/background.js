function query_tracer(acn){
  return new Promise(function(resolve,reject){
    fetch(`http://127.0.0.1:8088/user/query?user=${acn}`,{
        method: 'GET',
        timeout: 60000,
    }).then(r=>r.json()).then(r=>{
      resolve(r)
    })
  })
}

var acn = ""
var tracer_list = []
var p = new Promise(async function(resolve, reject){
  acn = await get_acn()
  tracer_list = await query_tracer(acn)
  console.log(tracer_list)
  let i = 0
  while(true){
    let user = tracer_list[i]
    console.log(user)
    let acn_info = await get_hash_code(user.acn)
    if (acn_info.hash_code.length == 0 || acn_info.uid.length == 0) {
      console.log(`沒有取得${user.acn}的貼文，請檢查觀看權限`)
    } else {
      let token = null
      while (true) {
          let rsp = await get_post(acn_info.uid, acn_info.hash_code, token, acn_info.acn);
          let save_rsp = await save2db(rsp.data)
          if (rsp.has_next_page == false) {
              break
          }
          token = rsp.next_token
      }
    }
    i+=1
    if (i == tracer_list.length){
      i = 0
    }
    await sleep(60)
  }
})

function sleep(sec){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve()
    },sec*1000)
  })
}


chrome.webRequest.onBeforeSendHeaders.addListener(function (detail) {
  // change origin for bypass CORS
  if ("url" in detail && "initiator" in detail) {
    if (detail.url.indexOf("https://www.instagram.com/") != -1 && detail.initiator.indexOf("chrome-extension://") != -1) {
      var newRef = "https://www.instagram.com/";
      var gotRef = false;
      for (var n in detail.requestHeaders) {
        gotRef = detail.requestHeaders[n].name.toLowerCase() == "referer";
        if (gotRef) {
          detail.requestHeaders[n].value = newRef;
          break;
        }
      }
      if (!gotRef) {
        detail.requestHeaders.push({ name: "referer", value: newRef });
      }
      var newOri = "https://www.instagram.com";
      var gotOri = false;
      for (var n in detail.requestHeaders) {
        gotOri = detail.requestHeaders[n].name.toLowerCase() == "origin";
        if (gotOri) {
          detail.requestHeaders[n].value = newOri;
          break;
        }
      }
      if (!gotOri) {
        detail.requestHeaders.push({ name: "origin", value: newOri });
      }
    }
    return { requestHeaders: detail.requestHeaders };
  }
}, {
  urls: ["<all_urls>"]
}, [
  "requestHeaders",
  "blocking",
  "extraHeaders"
])

function query_data(key_word){
  return new Promise(function(resolve,reject){
    fetch(`http://127.0.0.1:8088/data/query?user=${acn}&key_word=${encodeURIComponent(key_word)}`,{
        method: 'GET',
        timeout: 60000,
    }).then(r=>r.json()).then(r=>{
      console.log(r)
      resolve(r)
    })
  })
}

function save_acn(user){
  return new Promise(function(resolve,reject){
    fetch(`http://127.0.0.1:8088/user/save?acn=${user}&owner=${acn}`,{
        method: 'GET',
        timeout: 60000,
    }).then(r=>r.json()).then(r=>{
      console.log(r)
      resolve(r)
    })
  })
}

function del_acn(user){
  return new Promise(function(resolve,reject){
    fetch(`http://127.0.0.1:8088/user/del?acn=${user}&owner=${acn}`,{
        method: 'GET',
        timeout: 60000,
    }).then(r=>r.json()).then(r=>{
      console.log(r)
      resolve(r)
    })
  })
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      if (request.type == "query_data") {
        if (acn.length  == 0){
          acn = get_acn()
        }
        if (acn.length == 0){
          sendResponse([])
        }else{
          var p = new Promise(async function(resolve,reject){
            let rst = await query_data(request.key_word)
            sendResponse(rst)
            resolve()
          })
        }
      }
      else if (request.type == "query_user"){
        if (acn.length  == 0){
          acn = get_acn()
        }
        if (acn.length == 0){
          sendResponse([])
        }else{
          var p = new Promise(async function(resolve,reject){
            let rst = await query_tracer(acn)
            sendResponse(rst)
            resolve()
          })
        }
      }
      else if (request.type == "save_acn") {
        console.log(request)
        var p = new Promise(async function(resolve,reject){
          let flag = 0
          tracer_list.forEach(item=>{
            if (item.acn == request.acn){
              flag = 1
            }
          })
          if(flag == 0){
            let data= {}
            data.acn = request.acn
            data.owner = acn
            tracer_list.push(data)
            await save_acn(request.acn)
          }
          sendResponse("ok")
          resolve()
        })
      }else if (request.type == "del_user"){
        let i = -1
        tracer_list.forEach((item,idx)=>{
          if (item.acn == request.acn){
            i = idx
          }
        })
        if(i>=0){
          tracer_list.splice(i,1)
        }
        var p = new Promise(async function(resolve,reject){
          await del_acn(request.acn)
          sendResponse("ok")
        })
      }
      return true
  }
)
