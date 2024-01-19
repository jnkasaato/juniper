const OrderModal = ({ item, isOpen, onClose, isSuccessful, link, size }) => {
    return (
        <div className="order__modal">
      <div className="modal__header">
        {isSuccessful ? (
          <div className = "modal__header_complete">
            <h1>Thanks for your order</h1>
            <a href= {link} target ="_blank" rel="noreferrer"> <h5>view hash</h5></a>
          </div>

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
          <img
            src={`/items/img${item.id}.jpg`}
            alt={`/items/img${item.id}.jpg`}
          />
          <h2>{item.name}</h2>
        </div>
        <div className="modal__content_middle">
          <h2>Order info</h2>
          <div className="modal__details">
            <h3 className="">rating:</h3>
            <div>
              <img src={item.rating >= 5 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
              <img src={item.rating >= 4 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
              <img src={item.rating >= 3 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
              <img src={item.rating >= 2 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
              <img src={item.rating >= 1 ? '/items/star.png' : '/items/blank.png' }  alt="Star"  />
            </div>
          </div>
          <div className="modal__details">
            <h3>Quantity:</h3>
            <h3> 1</h3>
          </div>
          <div className="modal__details ">
            <h3>COLOR: </h3>
            <h3 >{item.color}</h3>
          </div>
          <div className="modal__details">
            <h3>ships from:</h3>
            <h3>Boston</h3>
          </div>
          <div className="modal__details">
            <h3>VENDOR: </h3>
            <h3>{item.vendor}</h3>
          </div>
        </div>
        <div className="modal__content_right">
          <h2>Louis & Co.</h2>
          <img src="/icon.png" alt="icon" />
          <div className="modal__content_right_total">
            <h3>TOTAL:</h3>
            <h3>{item.cost} ETH</h3>
          </div>
        </div>
      </div>
      <div className="modal__content_brand">
        <h4>• LOUIS & CO. • FAMILY BRAND • EST 2017</h4>
      </div>
    </div>
    );
};

export default OrderModal;