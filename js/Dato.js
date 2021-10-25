class Datos
{
    constructor(descripcion, valor)
    {
        this._descripcion = descripcion;
        this._valor = valor; 
    }

    //Metodods get
    get descripcion()
    {
        return this._descripcion;
    }

    get valor()
    {
        return  this._valor;
    }

    //Metodos set
    set descripcion(descripcion)
    {
        this._descripcion = descripcion;
    }

    set valor(valor)
    {
        this._valor = valor; 
    }
}