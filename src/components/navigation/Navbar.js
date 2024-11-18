import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import NavigationWrapper from "../wrappers/NavigationWrapper.js";
import Menu from "./Menu.js";

export default function Navbar() {
  const { id } = useContext(UserContext);

  const options = [
    {
      id: 1,
      label: "Inicio",
      link: "/",
    },
    {
      id: 2,
      label: "Artículos",
      link: "/",
    },
    {
      id: 3,
      label: "Usuarios",
      link: "/users",
    },
    {
      id: 4,
      label: "Favoritos",
      link: `/users/${id}/favorites`,
    },
  ];

  return (
    <NavigationWrapper>
      <Menu options={options} />
    </NavigationWrapper>
  );
}
