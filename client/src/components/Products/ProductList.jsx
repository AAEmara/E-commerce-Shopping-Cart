import Product from "./Product";

const ProductList = ({ products }) => (
  <div>
    {products.map((product) => (
      <Product key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList;
