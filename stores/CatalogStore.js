// CatalogStore Methods
CatalogStore = {
  addProduct: function(name,price){
    if (name === '') {
      Session.set("Catalog.AddProductError", "wrong-name");
    } else if ((price === '')||(!$.isNumeric(price))){
      Session.set("Catalog.AddProductError", "wrong-price");
    } else {
      Catalog.insert({name:name, price:price});
      Session.set("Catalog.AddProductError", false);
      Session.set("Catalog.OpenAddProduct", false);
    }
  },
  addAnotherProduct: function(){
    var number = Catalog.find().count() + 1;
    CatalogStore.addProduct("Product "+number, number);
  },
  removeProduct: function(id){
    Catalog.remove(id);
  },
  openAddProduct: function(){
    Session.set("Catalog.OpenAddProduct", true);
  },
  closeAddProduct: function(){
    Session.set("Catalog.OpenAddProduct", false);
  }
};

// CatalogStore Callbacks
CatalogStore.tokenId = Dispatcher.register(function(payload){
  switch(payload.actionType){
    case "ADD_PRODUCT":
      CatalogStore.addProduct(payload.product.name, payload.product.price);
      break;
    case "REMOVE_PRODUCT":
      CatalogStore.removeProduct(payload.product._id);
      break;
    case "ADD_ANOTHER_PRODUCT":
      CatalogStore.addAnotherProduct();
      break;
    case "OPEN_ADD_PRODUCT":
      CatalogStore.openAddProduct();
      break;
    case "CLOSE_ADD_PRODUCT":
      CatalogStore.closeAddProduct();
      break;
  }
});
