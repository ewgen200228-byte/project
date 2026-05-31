'use strict';

let data = {}
let balance = 0 
let fingers = []





fetch('https://hybknslaqhtcuhjhctvw.supabase.co')
    .then(function(reponse) {
        if (reponse.ok) {
            return reponse.json()
        }
    })
    .then(function(data) {
        fingers = data.fingers
        console.log(data)
    .catch(function(error) {
        console.log("Ошибка!!!!!!")
    })
    })
