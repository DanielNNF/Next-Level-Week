//pegar o botão "Pesquisar pontos de coleta"
const buttonSearch = document.querySelector("#page-home main a") // procurar dentro do page-home, dentro do main e pegar o "a"
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click",() => { //quando clicar no butão , ouvir o evento de clique
  modal.classList.remove("hide")// quando clicar irá remover a classe hide


}) 

close.addEventListener("click", ()=>{// quando clicar no "a/close", vai executar uma função anônima
  modal.classList.add("hide")//irá add a classe hide

})
