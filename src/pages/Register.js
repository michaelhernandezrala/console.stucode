import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import UserService from "../api/services/UserService";
import Button from "../components/common/inputs/Button";
import FormControl from "../components/common/inputs/FormControl";
import Input from "../components/common/inputs/Input";
import Label from "../components/common/inputs/Label";
import AuthWrapper from "../components/wrappers/AuthWrapper";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.register(data);
      if (response.statusCode !== StatusCodes.CREATED) {
        toast.error(response.message);
        return;
      }
      toast.success("¡Bienvenido a StuCode! Tu cuenta ha sido creada exitosamente", {
        autoClose: 500,
        hideProgressBar: true,
        onClose: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      toast.error(error?.data?.message ?? error.message, { autoClose: false });
    }
  };

  return (
    <AuthWrapper title="Únete a StuCode" subtitle="Colabora, aprende y crece con otros desarrolladores">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormControl>
          <Label htmlFor="name">Nombre</Label>
          <Input
            name="name"
            type="text"
            required={true}
            value={data.name}
            onChange={handleChange}
            autoFocus={true}
            placeholder="John Doe"
          />
        </FormControl>

        <FormControl>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            required={true}
            value={data.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </FormControl>

        <FormControl>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" value={data.password} onChange={handleChange} required={true} />
        </FormControl>

        <Button type="submit">Crear cuenta</Button>
      </form>

      <div className="mt-4 text-center">
        <p>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-600">
            Inicia sesión
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthWrapper>
  );
}

export default Register;
