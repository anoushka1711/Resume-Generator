function addNewWEField()
{
    let newNode = document.createElement("textarea")
    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("placeholder" , "Enter here");


    let weOb = document.getElementById("we");
    let weAddButtonOb = document.getElementById("weAddButton");
 
    weOb.insertBefore(newNode, weAddButtonOb); 
}

function addNewAQField()
{
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("eqField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("placeholder" , "Enter here");


    let aqOb = document.getElementById("aq");
    let aqAddButtonOb = document.getElementById("aqAddButton");
 
    aqOb.insertBefore(newNode, aqAddButtonOb); 

    

}


function generateCV(){
    let nameField = document.getElementById("nameField").value;
    let nameT1 = document.getElementById("nameT1");
    nameT1.innerHTML=nameField;

    //direct
    document.getElementById('nameT2').innerHTML = nameField;

    let contactField=document.getElementById('contactField').value;                                      //first method
    let contactT=document.getElementById('contactT');
    contactT.innerHTML=contactField;

    document.getElementById('addressT').innerHTML=document.getElementById('addressField').value;        // second method

    fbT.innerHTML=document.getElementById('fbField').value;                                             
    instaT.innerHTML=document.getElementById('instaField').value;
    linkedT.innerHTML=document.getElementById('linkedField').value;

    objectiveT.innerHTML=document.getElementById('objectiveField').value;

    let wes = document.querySelectorAll('.weField');   //fix for - automatically adding field
    let str = '';

    wes.forEach((we) => {
        str += `<li>${we.value}</li>`;
    });

    document.getElementById('weT').innerHTML = str;


    //aq
    let aqs = document.getElementsByClassName("eqField");
    let str1 ='';

    for (let e of aqs){
        str1 += `<li> ${e.value} </li>`;
    }
    document.getElementById('aqT').innerHTML=str1;


    // code for setting image
    let file = document.getElementById("imgField").files[0];
    console.log(file);
    let reader = new FileReader()
    reader.readAsDataURL(file);    
    console.log(FileReader.result); //if error change it to console.log(reader.result);


    reader.onloadend = function(){
        document.getElementById('imgTemplate').src= reader.result;
    }

    document.getElementById('cv-form').style.display="none";
    document.getElementById('cv-template').style.display="block";
    document.getElementById('gcv').style.display="none";
}
// print cv
// function printCV(){
//     var body =document.getElementById('body').innerHTML; 
//     var data =document.getElementById('cv-template').innerHTML; 
//     var body =document.getElementById('cv-template').innerHTML = data;
//     window.print() ;
//}

function printCV() {
    var data = document.getElementById('cv-template').innerHTML;
    document.body.innerHTML = data;
    window.print();
}

function downloadCV() {
    // Select the CV template element
    const cvElement = document.getElementById('cv-template');
    
    // Options for the PDF
    const options = {
        margin: 0.5,
        filename: 'My_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate and download the PDF
    html2pdf().from(cvElement).set(options).save();
}


   

