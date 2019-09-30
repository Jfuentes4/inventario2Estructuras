import Article from './Article.js';

class InventaryManager {
  constructor () {
    this._articles = [];
  }

  addArticle = (dataArticle) => {
    if (this._ifDontExist(dataArticle.code)) {
      if(this._setArticleToArrayAndLS(dataArticle)){
        document.getElementById('newArticleForm').reset();
        window.alert('el articulo ha sido añadido correctamente');
      }
    } else {
      window.alert('este Articulo ya esta actualmente registrado');
    }

  }

  _setArticleToArrayAndLS = (dataArticle) => {
    let success = false;
    console.log(dataArticle);
    if (this._articles.length < 2) {
      if (this._articles.length === 0) this._articles[0] = new Article(dataArticle);
      else if (this._articles[0].code < dataArticle.code) {
        this._articles[1] = new Article(dataArticle);
        success = true;
      } else {
        this._articles[1] = this._articles[0];
        this._articles[0] = new Article(dataArticle);
        success = true;
      }
    }
    else if (this._articles.length < 20) {
      let pos = this.findArticle(dataArticle.code, true);
      console.log(pos);
      console.log(this._articles);
      this._desplaceItems(pos, 1, this._articles);
      this._articles[pos] = new Article(dataArticle);
      success = true;
    } else {
      window.alert('No se pudo añadir el articulo, El inventario esta lleno');
    }
    console.log(this._articles);

    return success;
  }

  deleteArticle = (code) => {
    let index = this.findArticle(code);
    if (index !== -1){
      this._myRemoveAt(index, this._articles);
      window.alert('Se ha eliminado el producto ' + code + ' correctamente.');
    } else {
      window.alert('no se encontro el producto con el indice ' + code);
    }
  }

  _desplaceItems = (originIndex, positions, array) => {
    let size = array.length + positions -1;
    for (let i = size; i > originIndex; i--) {
      array[i] = array[i - positions];
    }
  }

  _myRemoveAt = (index, array) => {
    for (let i = index; i < array.length; i++){
      array[i] = array[i+1];
    }
    array.length = array.length - 1
    console.log(array);
  }

  searchArticles = (str) => {
    let index = this.findArticle(str);
    console.log(index);
    if (index !== -1){
      let element = this._articles[index];
      window.alert('Codigo: ' + element.code + ' Nombre: ' + element.name + ' Price: ' + element.price +
      ' Cantidad: '+ element.quantity + ' Descripcion: ' + element.description);
    } else {
      window.alert('no se encontro el producto con el indice ' + str);
    }
  }

  report = (report) => {
    let reportstr = '<h3>Reporte de Inventario</h3> <br><br>',
    sumArticles = 0;
    this._articles.forEach((article) => {
      reportstr += article.toString() + '<br>'
      sumArticles += article.quantity;
    })
    reportstr += '<br>Total de Articulos Distintos: ' + this._articles.length + ' Total de Articulos en inventario: ' + sumArticles;
    report.innerHTML = reportstr;
  }


  _ifDontExist = (code) => {
    let dontExist = true;
    if (this.findArticle(code) !== -1) {
      dontExist = false;
    }
    return dontExist;
  }

  findArticle = (pCode, aproximar = false) => {
    let inf = 0,
    sup = this._articles.length - 1,
    code = Number(pCode),
    target;

    while(inf <= sup) {
      target = Math.floor((inf + sup)/2);
      console.log('taget: ' + target);
      var test = Number(this._articles[target].code);
      if(test == code){
        return target;
      }
      if(test > code){
        sup = target - 1;
      } else {
        inf = target + 1;
      }
      console.log('taget: ' + target);
      }

      if (aproximar) {
        let pos;
        if (code < this._articles[target].code && target > 0){ pos = target ; alert(code + 'es menor que' + this._articles[target].code)}
        else if (code < this._articles[target].code && target === 0) pos = target
        else pos = target + 1;

        return pos;
      }
      return -1;
    }

}

export default InventaryManager;
