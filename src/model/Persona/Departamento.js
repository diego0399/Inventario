export class Departamento {
  constructor(id, codigo, departamento, total) {
    this._id = id;
    this._codigo = codigo;
    this._departamento = departamento;
    this._total = total;
  }

  get id() {
    return this._id;
  }

  get codigo() {
    return this._codigo;
  }

  get departamento() {
    return this._departamento;
  }

  get total() {
    return this._total;
  }

  set id(valor) {
    this._id = valor;
  }

  set codigo(valor) {
    this._codigo = valor;
  }

  set departamento(valor) {
    this._departamento = valor;
  }

  set total(valor) {
    this._total = valor;
  }
}
