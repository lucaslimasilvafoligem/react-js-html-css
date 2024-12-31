function calculate(){
    var height=document.getElementById("height").value/100
    var weight=document.getElementById("weight").value
    imc = weight/(height **2 );
    console.log(imc);

    if (imc < 18.5){
        window.alert("Magro")
    } else if(imc < 24.9){
        window.alert("Normal")
    } else if(imc < 39.9){
        window.alert("Obeso")
    } else if(imc > 39.9){
        window.alert("Muito obeso")
    }
}