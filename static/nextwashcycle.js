function showTags() {
    
    const ul = document.getElementById('tags');
    ul.textContent = '';

    fetch('../api/v1/label/Tagstile')
        .then((resp) => resp.json())
        .then(function(data) {
    return data.map(function(label) { 
        var myLabel = {
            id: label["_id"],
            owner: label.owner, 
            location: label.location,
            mainColor: label.mainColor,
            secondaryColor: label.secondaryColor,
            pattern: label.pattern, 
            material: label.material, 
            washInfo: label.washInfo,
            washable: label.washable,
        };
        console.log(myLabel);
        fetch('../api/v1/wash/id/' + myLabel.id).then(resp => resp.json()).then(data => {
            const date1 = new Date();
            console.log('cool');
            console.log(data);
            data = data.sort((e, i) => e.date < i.date);
            console.log(data);
            const date2 = new Date(data[data.length-1].date);
            console.log(date1);
            console.log(date2);
            console.log('---');
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");

            let displayLabel = {
                owner: label.owner, 
                id: myLabel.id,
                timeDiff: diffDays + ' days and ' + (diffTime/1000/60) + ' minutes since last wash',
            };
            let node = document.createElement('li');
            node.style.display = 'flex';
            node.style.justifyContent = 'space-between';
            node.style.padding = '10px';
            node.style.margin = '15px';
            let div1 = document.createElement('div');
            div1.innerText = displayLabel.owner;
            let div2 = document.createElement('div');
            div2.innerText = displayLabel.id;
            let div3 = document.createElement('div');
            div3.innerText = displayLabel.timeDiff;
            node.style.backgroundColor = "white";
            node.style.borderRadius = "10px";
            node.style.color = "black";
            node.appendChild(div1);
            node.appendChild(div2);
            node.appendChild(div3);
            ul.appendChild(node);
            showInfo(); 
    

            });
        });
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