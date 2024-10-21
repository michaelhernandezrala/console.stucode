import Button from "../components/common/inputs/Button.js";
import FormControl from "../components/common/inputs/FormControl.js";
import Input from "../components/common/inputs/Input.js";
import Label from "../components/common/inputs/Label.js";
import AuthWrapper from "../components/wrappers/AuthWrapper.js";

function Register() {
  return (
    <AuthWrapper title="Únete a StuCode" subtitle="Colabora, aprende y crece con otros desarrolladores">
      <form className="space-y-4">
        <FormControl>
          <Label htmlFor="firstname">Nombre</Label>
          <Input name="firstname" type="text" required={true} autoFocus={true} placeholder="John" />
        </FormControl>

        <FormControl>
          <Label htmlFor="lastname">Apellido</Label>
          <Input name="lastname" type="text" required={true} placeholder="Doe" />
        </FormControl>

        <FormControl>
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" required={true} placeholder="john.doe@example.com" />
        </FormControl>

        <FormControl>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required={true} />
        </FormControl>

        <Button type="submit">Crear cuenta</Button>
      </form>
    </AuthWrapper>
  );
}

export default Register;
