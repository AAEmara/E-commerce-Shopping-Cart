const Cart = ({ cart, onUpdate, onRemove }) => (
  <div>
    {cart.map((item) => (
      <div key={item.id}>
        <h4>{item.name}</h4>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, e.target.value)}
        />
        <button onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    ))}
    <h3>
      Total: $
      {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
    </h3>
  </div>
);

export default Cart;
