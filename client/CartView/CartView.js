// CartView helpers
Template.CartView.helpers({
  cart_items: function(){
    return CartStore.getItems();
  },
  product: function(){
    return CatalogStore.getOneProduct(this.product_id);
  },
  total_item_price: function(){
    var unit_price = CatalogStore.getOneProduct(this.product_id).price;
    return this.quantity * unit_price;
  },
  total_cart_price: function(){
    var total = 0;
    CartStore.getItems().forEach(function(cart_item){
      var unit_price = CatalogStore.getOneProduct(cart_item.product_id).price;
      total = total + unit_price * cart_item.quantity;
    });
    return total;
  },
  cart_items_count: function(){
    return CartStore.getItems().count();
  }
});

// CartView events
Template.CartView.events({
  'click .increase': function(){
    Dispatcher.dispatch({ actionType: "INCREASE_CART_ITEM", item: this });
  },
  'click .decrease': function(){
    Dispatcher.dispatch({ actionType: "DECREASE_CART_ITEM", item: this });
  },
  'click .remove': function(){
    Dispatcher.dispatch({ actionType: "REMOVE_CART_ITEM", item: this });
  }
});

// CartView subscriptions
Template.CartView.onCreated(function () {
  var self = this;
  self.autorun(function(){
    self.subscribe("Catalog.productsInCart", CartStore.getItemsArray());
    self.subscribe("Cart.userCart", CartStore.getCartId());
  });
});
