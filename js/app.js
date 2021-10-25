const ingresos = [
    new Ingreso('Salario',60000),
    new Ingreso('Inversion',15000)
];
const egresos = [
    new Egreso('Pago deudas' , 15000),
    new Egreso('Pago alquiler', 20000),
    new Egreso('Comida' , 10000)
];

//Al cargar la pagina se ejecutara la funcion 
let cargarApp = () =>
{
    cargarCabecero();
    cargaIngresos();
    cargaEgresos();
}

//Calcula el total de los ingresos almacenados
let totalIngresos = () =>
{
    let totalIngresos = 0;
    for(let ingreso of ingresos)
    {
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

//Calcula el total de los egresos almacenados
let totalEgresos = () =>
{
    let totalEgresos=0;
    for(let egreso of egresos)
    {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

//Funcion que calculara el presupuesto total de los ingresos y egresos ingresados en los arreglos
let cargarCabecero = () => 
{
    let presupuestoTotal = totalIngresos() - totalEgresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuestoTotal);
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso); 
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

//Para darle formato al valor
const formatoMoneda = (valor) =>
{
    //Metodo para darle formato a la moneda
    return valor.toLocaleString('es-AR' , {style:'currency' , currency:'ARS' , minimumFractionDigits:2});
}

//Para darle formato al porcentaje
const formatoPorcentaje = (valor) =>
{
    return valor.toLocaleString('es-AR' , {style:'percent' , minimumFractionDigits:1});
}

//Funcion para cargar ingresos
const cargaIngresos = () =>
{
    let ingresosHTML = '';
    for(let ingreso of ingresos)
    {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista_ingresos').innerHTML = ingresosHTML;
}

//Funcion para que se cree la estructura html por cada ingreso
const crearIngresoHTML = (ingreso) =>
{
    let ingresoHTML = '<div class="elemento limpiarEstilos"> <div class="elemento_descripcion">'+ingreso.descripcion+'</div> <div class="derecha limpiarEstilos"> <div class="elemento_valor">+ '+formatoMoneda(ingreso.valor)+'</div> <div class="elemento_eliminar"> <button class="elemento_eliminar--btn"> <ion-icon name="trash-outline" onclick="eliminarIngreso('+ingreso.id+')"></ion-icon> </button> </div> </div> </div> ';
    return ingresoHTML;
}

//Metodo para eliminar un ingreso
let eliminarIngreso = (id) =>
{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id); //FindIndex realizara una comparacion entre los elementos del arreglo y el indice "id" que le pase 
    //La variable ingreso almacena cada uno de los elementos del arreglo de ingresos (Funciona similar al bloque for)
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargaIngresos();
}

//Funcion para cargar los egresos
const cargaEgresos = () =>
{
    let egresosHTML = '';
    for(let egreso of egresos)
    {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista_egresos').innerHTML = egresosHTML;
}

//Funcion para que se cree la estructura html por cada egreso
const crearEgresoHTML = (egreso) =>
{
    let egresoHTML = '<div class="elemento limpiarEstilos"> <div class="elemento_descripcion">'+egreso.descripcion+'</div> <div class="derecha limpiarEstilos"> <div class="elemento_valor">- '+formatoMoneda(egreso.valor)+'</div> <div class="elemento_porcentaje">'+formatoPorcentaje(egreso.valor / totalEgresos())+'</div> <div class="elemento_eliminar"> <button class="elemento_eliminar--btn"> <ion-icon name="trash-outline" onclick="eliminarEgreso('+egreso.id+')"></ion-icon> </button> </div> </div> </div>';
    return egresoHTML;
}

//Metodo para eliminar un egreso
let eliminarEgreso = (id) =>
{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargaEgresos();
}

//Metodo para agregar datos a los ingresos y egresos
let agregaDato = () =>
{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== '')
    {
        if(tipo.value === 'ingreso')
        {
            let ingreso = new Ingreso(descripcion.value , Number(valor.value));
            ingresos.push(ingreso);
            cargarCabecero();
            cargaIngresos();
        }else if(tipo.value === 'egreso')
        {
            let egreso = new Egreso(descripcion.value , Number(valor.value));
            egresos.push(egreso);
            cargarCabecero();
            cargaEgresos();
        }
    }
}