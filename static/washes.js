

function showWashes() {
  fetch('../api/v1/label/Tagstile')
  .then((resp) => resp.json()) 
  .then(function(data) {
    console.log('before datamap '+data); 
  return data.map(function(label) { 
         id=label._id; 
         itemLocation=label.location; 
         print(id, itemLocation);
      })
  })
  .catch( error => console.error(error) );
  
}
showWashes();
showInfo();



function showInfo(){
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      }); 
}}

function print(id, itemLocation){
  const ul = document.getElementById('washTags');
  ul.textContent = '';
  console.log('ul= '+ul); 
  console.log("id in print= "+id);
  fetch('../api/v1/wash/id/'+id)
  .then((resp) => resp.json())
  .then(function(data) {
  return data.map(function(wash) {
    console.log('ul2= '+ul);
    var myWashLabel = {
    labelId: wash.labelId,
    date: wash.date,
    location: wash.location, 
    washingMachine: wash.washingMachine,
    };              
    let date = document.createElement('button');
    date.href = myWashLabel.self;
    date.textContent = myWashLabel.date; 
    date.className='collapsible';
    console.log('ul= '+ul); 
    let location = document.createElement('info');
    location.href = myWashLabel.self;
    location.textContent = myWashLabel.location; 
    let washingMachine = document.createElement('info');
    washingMachine.href = myWashLabel.self;
    washingMachine.textContent = myWashLabel.washingMachine; 
    let itemLoc=document.createElement('info'); 
    itemLoc.herf=itemLocation;
    let infos=document.createElement('div'); 
    infos.className='content'; 

    let table=document.createElement('table');
    let tr1=document.createElement('tr'); 
    let th1=document.createElement('th');
    th1.textContent='laundrette'; 
    let th2=document.createElement('th');
    th2.textContent='washing Machine'; 
    let th3=document.createElement('th');
    th3.textContent='item location'; 
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3);
    let tr2=document.createElement('tr'); 
    let td1=document.createElement('td'); 
    td1.appendChild(location); 
    let td2=document.createElement('td'); 
    td2.appendChild(washingMachine);
    let td3=document.createElement('td'); 
    td3.appendChild(itemLoc);    
    tr2.appendChild(td1); 
    tr2.appendChild(td2);    
    tr2.appendChild(td3); 
    table.appendChild(tr1);
    table.appendChild(tr2);   
    infos.appendChild(table);
    ul.appendChild(date)
    ul.appendChild(infos);
    showInfo();    
})})

}