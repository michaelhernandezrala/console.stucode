import Button from "../components/common/inputs/Button.js";
import FormControl from "../components/common/inputs/FormControl.js";
import Input from "../components/common/inputs/Input.js";
import Label from "../components/common/inputs/Label.js";
import AuthWrapper from "../components/wrappers/AuthWrapper.js";

function Login() {
  return (
    <AuthWrapper title="¡Bienvenido de nuevo!" subtitle="Inicia sesión para continuar con tu viaje de aprendizaje">
      <form className="space-y-4">
        <FormControl>
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" required={true} autoFocus={true} placeholder="john.doe@example.com" />
        </FormControl>

        <FormControl>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required={true} />
        </FormControl>

        <Button type="submit">Acceder</Button>
      </form>
    </AuthWrapper>
  );
}

export default Login;
