function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {

      for( const state of states ) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }

  })
}

populateUFs()

function getCities(event){
  const citysSelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

    
  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex 
  
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  citysSelect.innerHTML ="<option value>Selecione a Cidade</option>"
  citysSelect.disabled = true

  fetch(url)
  .then( res => res.json() )
  .then( cities => {

          for( const city of cities ) {
        citysSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citysSelect.disabled = false

  })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //Itens de Coleta

    const itemsToCollect = document.querySelectorAll(".items-grid li")//Vai buscar todos que estiverem dentro

    for (const item of itemsToCollect){ //Estrutura de repetição
      item.addEventListener("click", handleSelectedItem)

    } 

    const collectedItems = document.querySelector("input[name=items]")

    let selectedItems = [] //essa Array fica em branco pra receber os 6 itens, função criada no HTML "<input type="hidden" name="items">" 

    function handleSelectedItem(event){
      const itemLi = event.target

      // Adicionar ou remover uma classe com JS
      itemLi.classList.toggle("selected")//Toggle  -> se encontrar a classe ele remove e se não encontrar ele adiciona, como marcar e desmarcar
      
      const itemId = itemLi.dataset.id //vai pegar os itens que tem no Id, os 6 itens de coleta, ou seja quando for clicado


      
      //verificar se existem itens selecionados, se sim
      //pegar is itens selecionados
      const alreadySelected = selectedItems.findIndex(item => { //Quando o item for clicado , irá rodar essa função . "(function(item)" é igual a "item =>" 
        const itemFound = item == itemId //Quando retornar true , irá colocar o "alreadySelected"
        return itemFound

      })
      //console.log(alreadySelected >=0)


      //se ja estiver selecionado
      if (alreadySelected >=0) {//tirar seleção

      const filteredItems = selectedItems.filter(item=>{
        const itemIsDifferent = item != itemId //false
        return itemIsDifferent
      })
      
      selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

  }
