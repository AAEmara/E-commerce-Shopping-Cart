import { useForm } from "react-hook-form";
import axios from "axios";
import styles from './Signup.module.css';

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/auth/register", data);
      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("firstName")} placeholder="First Name" required className={styles.input} />
        <input {...register("lastName")} placeholder="Last Name" required className={styles.input} />
        <input {...register("username")} placeholder="Username" required className={styles.input} />
        <input {...register("email")} type="email" placeholder="Email" required className={styles.input} />
        <input {...register("password")} type="password" placeholder="Password" required className={styles.input} />
        <button type="submit" className={styles.button}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
