//Variables
const btnGuardar = document.getElementById("btn-guardar");
const listaGastos = [];

//Funcion inicial para validar elementos en localStorage
function revisarLocal(){
    if(localStorage.getItem("listado")){
        let listaObjeto = JSON.parse(localStorage.getItem("listado"));
        for (let i = 0; i < listaObjeto.length; i++) {
            listaGastos.push(listaObjeto[i])          
        }
    } else {
        console.log('No hay datos en localStorage')
    }
}

//Funcion para asociar al boton de guardar
function guardarDatos(){

    const gastoInput = document.querySelector('#gasto').value;
    const montoInput = Number(document.querySelector('#monto').value);
    const categoriaInput = document.querySelector('#categoria').value;
    const fechaInput = new Date().toISOString();

    //validaciones
    if(gastoInput.trim() === ""){
        alert('Debe escribir la descripcion del gasto')
        return
    }

    if(montoInput <= 0){
        alert('Debe escribir un monto mayor a 0')
        return
    }

    //Limpiar
    document.querySelector('#gasto').value = "";
    document.querySelector('#monto'). value = "";
    document.querySelector('#categoria').value = "";

    //guardar
    listaGastos.push({gasto: gastoInput,monto: montoInput, categoria: categoriaInput, fecha: fechaInput})
    localStorage.setItem("listado", JSON.stringify(listaGastos))

    //otras funciones despues de guardar
    totalHoy();
    totalMes();
    totalCategoria();
    totalIndividual()
}   

//Otras funciones 1
function totalHoy(){
    const totalHoy = document.querySelector("#total-hoy");
    let gastosDia = 0;
    listaGastos.forEach(element => {
        let fecha = new Date(element.fecha);
        if(fecha.getDate() === 29){
            gastosDia += element.monto;
        } 
    });
    totalHoy.value = gastosDia;
}

//otras funciones 2
function totalMes(){
    const totalMes = document.getElementById("total-mes");
    let gastosMes = 0;
    listaGastos.forEach(element => {
        let fecha = new Date(element.fecha);
        console.log(fecha.getMonth())
        if(fecha.getMonth() === 6){
            gastosMes += element.monto;
        } 
    });
    totalMes.value = gastosMes;
}

//Otras funciones 3
function totalCategoria(){
    const totalCategoria = document.getElementById("total-categoria");
    let comida = 0;
    let servicios = 0;
    let transporte = 0;
    let otros = 0;
    let entretenimiento = 0;
    listaGastos.forEach(element => {
        switch(element.categoria){
            case "1":
                comida += element.monto;
                break;
            case "2":
                transporte += element.monto;
                break;
            case "3":
                entretenimiento += element.monto;
                break;
            case "4":
                servicios += element.monto;
                break;
            case "5":
                otros += element.monto;
                break;           
        }
    })

    let resutadoCategoria = `Comida: ${comida} \n Transporte: ${transporte} \nServicios: ${servicios} \n Entretenimiento: ${entretenimiento}\n Otros: ${otros}`
    totalCategoria.value= resutadoCategoria
}

//Otras funciones 4
function totalIndividual(){
    const contenedor = document.querySelector("#padre")
    contenedor.innerHTML = "";

    listaGastos.forEach((element, index ) => {
        const nuevoContenerdor = document.createElement("div");
        const nuevaFila = document.createElement("p");
        const nuevoBoton = document.createElement("button");


        let detalle = `${element.gasto} ------ ${element.monto} \n ${element.fecha}`;
        nuevaFila.textContent = detalle;   
        nuevoBoton.textContent = "Eliminar";


        nuevoContenerdor.appendChild(nuevaFila);
        nuevoContenerdor.appendChild(nuevoBoton);
        contenedor.appendChild(nuevoContenerdor);

        //botones eliminar
        nuevoBoton.addEventListener("click", function(){
        listaGastos.splice(index,1);
        localStorage.setItem("listado", JSON.stringify(listaGastos));
        nuevoContenerdor.remove();

        //otras funciones despues de guardar
        totalHoy();
        totalMes();
        totalCategoria();
        totalIndividual()
        })
    });    
}




btnGuardar.addEventListener("click", guardarDatos);
revisarLocal()
totalHoy();
totalMes();
totalCategoria();
totalIndividual();


