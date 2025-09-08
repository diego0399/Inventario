export class Usuario {
  constructor(
    id,
    name,
    carnet,
    departamento,
    telefono,
    //correo,
    //estado,
    puesto
  ) {
    this._id = id;
    this._name = name;
    this._carnet = carnet;
    this._departamento = departamento;
    this._telefono = telefono;
    //this._correo = correo;
    //this._estado = estado;
    this._puesto = puesto;
  }

  // Getters

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get carnet() {
    return this._carnet;
  }

  get departamento() {
    return this._departamento;
  }

  get telefono() {
    return this._telefono;
  }
  /*
  get correo() {
    return this._correo;
  }

  get estado() {
    return this._estado;
  }
*/
  get puesto() {
    return this._puesto;
  }

  // Setters
  set id(valor) {
    this._id = valor;
  }

  set name(valor) {
    if (typeof valor === "string" && valor.length > 0) {
      this._name = valor;
    } else {
      console.warn("Nombre inválido");
    }
  }

  set carnet(valor) {
    if (typeof valor === "string" && valor.length > 0) {
      this._carnet = valor;
    } else {
      console.warn("Carnet inválido");
    }
  }

  set departamento(valor) {
    if (typeof valor === "string" && valor.length > 0) {
      this._departamento = valor;
    } else {
      console.warn("Departamento inválido");
    }
  }

  set telefono(valor) {
    if (typeof valor === "string" && valor.length > 0) {
      this._telefono = valor;
    } else {
      console.warn("Telefono inválido");
    }
  }

  set puesto(valor) {
    if (typeof valor === "string" && valor.length > 0) {
      this._puesto = valor;
    } else {
      console.warn("Puesto inválido");
    }
  }
}
