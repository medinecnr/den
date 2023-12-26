const zorluk = document.getElementById(`zorluk`)
const tahmin = document.getElementById(`tahmin`)
const content = document.getElementById(`content`)
const btn = document.getElementById(`btn`)
const badge = document.querySelector(`.badge`)


let random
btn.disabled = true
tahmin.disabled = true
let hak = 3

zorluk.addEventListener(`change`, function zorlukAyari() {
    let carpan = Number(zorluk.value)
    random = Math.round(Math.random() * carpan)
    console.log(random)
    btn.disabled = false
    tahmin.disabled = false
    badge.textContent = hak 
    zorluk.disabled = true
})

btn.addEventListener(`click`, tahminEt)
tahmin.addEventListener(`keyup`, function klavye(e) {
    if(e.keyCode === 13){
        tahminEt()
    }
})

let oyunBozan = 0

function tahminEt() {

    let tahminNum = Number(tahmin.value)
    if(oyunBozan==2){
        btn.disabled = true
        tahmin.disabled = true
    }
    if(isNaN(tahminNum)){
        contentAyarla(`Oyun yalnızca rakamlarla oynanıyor!` , [`text-primary`, `text-danger`], `text-warning`)
        oyunBozan++
    }else{
    hak--
    document.title = `Tahmin Oyunu - ${hak}`
    badge.textContent = hak
    if(tahminNum > random){
        contentAyarla(`Daha küçük bir sayı giriniz.`,`text-primary`, `text-danger`)
        btnAyarla(`btn-primary`, `btn-danger`)
    }else if(tahminNum < random){
        contentAyarla(`Daha büyük bir sayı giriniz.`,`text-primary`, `text-danger`)
        btnAyarla(`btn-primary`, `btn-danger`)
    }else{
        contentAyarla(`Tebrikler kazandınız!`, [`text-primary`, `text-danger`], `text-success`)
        btnAyarla([`btn-primary`, `btn-danger`], `btn-success`, true)
        tahmin.disabled = true
        document.title = `Tebrikler kazandınız`
    }
    if(hak == 0 && tahminNum != random){
        content.textContent = `Oyunu kaybettin!`
        btn.disabled = true
        tahmin.disabled = true
        document.title = `Kaybettiniz`
        
    }
}
tahmin.value = ``
}

function contentAyarla(yazi, kaldirilacak,eklenecek){
    content.textContent = yazi
    for(let i of kaldirilacak){
        content.classList.remove(i)
    }
    content.classList.add(eklenecek)
}
function btnAyarla(kaldirilacak,eklenecek,dis=false){
    for(let i of kaldirilacak){
        btn.classList.remove(i)
    }
    btn.classList.add(eklenecek)
    btn.disabled = dis
}