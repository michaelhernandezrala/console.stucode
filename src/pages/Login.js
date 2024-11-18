import { StatusCodes } from "http-status-codes";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import UserService from "../api/services/UserService";
import Button from "../components/common/inputs/Button";
import FormControl from "../components/common/inputs/FormControl";
import Input from "../components/common/inputs/Input";
import Label from "../components/common/inputs/Label";
import { UserContext } from "../components/contexts/UserContext";
import AuthWrapper from "../components/wrappers/AuthWrapper";

function Login() {
  const navigate = useNavigate();
  const { setToken, setId } = useContext(UserContext);
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.login(data);
      if (response.statusCode !== StatusCodes.OK) {
        toast.error(response.message);
        return;
      }

      const decodedToken = jwtDecode(response.data);
      setId(decodedToken.id);
      setToken(response.data);
      localStorage.setItem("authToken", response.data);

      toast.success("¡Bienvenido de nuevo! Has iniciado sesión exitosamente.", {
        autoClose: 1000,
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthWrapper title="¡Bienvenido de nuevo!" subtitle="Inicia sesión para continuar con tu viaje de aprendizaje">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormControl>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            required={true}
            value={data.email}
            onChange={handleChange}
            autoFocus={true}
            placeholder="john.doe@example.com"
          />
        </FormControl>

        <FormControl>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" value={data.password} onChange={handleChange} required={true} />
        </FormControl>

        <Button type="submit">Acceder</Button>
      </form>
      <div className="mt-4 text-center">
        <p>
          ¿Aún no tienes cuenta?{" "}
          <Link to="/register" className="text-blue-600">
            Crea una ahora
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthWrapper>
  );
}

export default Login;
