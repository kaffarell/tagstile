function showTags() {
    
    const ul = document.getElementById('tags');
    ul.textContent = '';

    
    fetch('../api/v1/label/Tagstile')
    .then((resp) => resp.json())
    .then(function(data) {
    return data.map(function(label) { 
            var myLabel = {
            owner: label.owner, 
            location: label.location,
            mainColor: label.mainColor,
            secondaryColor: label.secondaryColor,
            pattern: label.pattern, 
            material: label.material, 
            washInfo: label.washInfo,
            washable: label.washable,
            };                
            let location = document.createElement('button');
            location.href = myLabel.self;
            location.textContent = myLabel.location; 
            location.className='collapsible'

            let infoTitle=document.createElement('h3');
            let mainColor = document.createElement('mainColor');
            mainColor.href = myLabel.self;
            mainColor.textContent = myLabel.mainColor; 
            let secondaryColor = document.createElement('secondaryColor');
            secondaryColor.href = myLabel.self;
            secondaryColor.textContent = myLabel.secondaryColor; 
            let pattern = document.createElement('pattern');
            pattern.href = myLabel.self;
            pattern.textContent = myLabel.pattern; 
            let washInfo = document.createElement('washInfo');
            washInfo.href = myLabel.self;
            washInfo.textContent = myLabel.washInfo; 
            let washable = document.createElement('washable');
            washable.href = myLabel.self;
            washable.textContent = myLabel.washable; 
            let infos=document.createElement('div'); 
            infos.className='content'; 

            let table=document.createElement('table');
            let tr1=document.createElement('tr'); 
            let th1=document.createElement('th');
            th1.textContent='Main color'; 
            let th2=document.createElement('th');
            th2.textContent='Secondary color'; 
            let th3=document.createElement('th');
            th3.textContent='Pattern'; 
            let th4=document.createElement('th');
            th4.textContent='Wash info'; 
            let th5=document.createElement('th');
            th5.textContent='washable?'; 
            tr1.appendChild(th1);
            tr1.appendChild(th2);
            tr1.appendChild(th3);
            tr1.appendChild(th4);
            tr1.appendChild(th5);
            let tr2=document.createElement('tr'); 
            let td1=document.createElement('td'); 
            td1.appendChild(mainColor); 
            let td2=document.createElement('td'); 
            td2.appendChild(secondaryColor); 
            let td3=document.createElement('td'); 
            td3.appendChild(pattern); 
            let td4=document.createElement('td'); 
            td4.appendChild(washInfo); 
            let td5=document.createElement('td'); 
            td5.appendChild(washable); 
            tr2.appendChild(td1); 
            tr2.appendChild(td2);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            tr2.appendChild(td5);    
            table.appendChild(tr1);
            table.appendChild(tr2);  
            infos.appendChild(infoTitle); 
            infos.appendChild(table);
            ul.appendChild(location)
            ul.appendChild(infos);
            showInfo(); 

            
        })
    })
    .catch( error => console.error(error) );
    
}
showTags();


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