import View from './View.js';
import Model from './Model.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    view.on('renderDate', this.addDate);
    // view.on('getCategoryValue', this.getCategoryValue);
  }

  // getCategoryValue = nameCategory => {
  //   const date = this.model.getTotalCountriesCategories(nameCategory);
  //   return date;
  // };

  addDate = () => {
    this.model.getGlobalDate();
  };
}
// const Control = new Controller(new Model(), new View());
window.addEventListener('load', () => {
  const model = new Model();
  const view = new View(model);

  const controller = new Controller(model, view);
  view.show();
});
// // посмотреть карту

// const app = new Controller(new Model(), new View());

// export default loadedMap;
