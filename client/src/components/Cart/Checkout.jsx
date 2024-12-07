import { useForm } from "react-hook-form";

const Checkout = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Checkout data:", data);
    alert("Payment processed successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("shippingAddress")} placeholder="Shipping Address" />
      <input {...register("billingInfo")} placeholder="Billing Info" />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default Checkout;
