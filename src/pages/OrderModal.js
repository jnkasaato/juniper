const OrderModal = ({ item , isOpen, onClose, isSuccessful}) => {
 

  return (
    <div className="order__modal">
      <div className="modal__header">
        {isSuccessful ? (
          <h1>Transaction Successful!</h1>
        ) : (
          <div className="modal__loading">
            <h1>Processing Order</h1>
            <img src="/loading.gif" alt="Loading" />
          </div>
        )}
        <img
          src="/close.svg"
          alt="Close"
          className="modal__close"
          onClick={onClose}
        />
      </div>

      <div className="modal__content">
        <div className="modal__content_left">
          <h2>YOUR ORDER</h2>
          <img src={`/items/img${item.id}.jpg`} alt={`/items/img${item.id}.jpg`} />
          <h2>{item.name}</h2>
          <h3>Quantity: 1</h3>
          <h3>VENDOR: {item.vendor}</h3>
        </div>
        <div className="modal__content_right">
        <h2>shopping bag</h2>
        <img src='/icon.png' alt="icon" />
        <div className="modal__content_right_total">
          <h3>TOTAL:</h3>
          <h3>{item.cost} ETH</h3>
        </div> 
        </div>     
      </div>
      <div className="modal__content_brand">
      <h4>• JUNIPER GARDEN • FAMILY BRAND • EST 2017</h4>
      </div>
    </div>
  );
};

export default OrderModal;
