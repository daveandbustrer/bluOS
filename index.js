function update_time(){
    var time =  new Date().toLocaleString().replace(",","")
    var clock = window.document.getElementById("clock")
    clock.innerHTML = time
    console.log(time)
}
setInterval(update_time,1000)