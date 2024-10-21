import { Link } from "react-router-dom";

import NavigationWrapper from "../wrappers/NavigationWrapper.js";
import NavItem from "./NavItem.js";
import NavItemGroup from "./NavItemGroup.js";

function Navbar() {
  return (
    <NavigationWrapper>
      <NavItemGroup>
        <NavItem to="/articles">Artículos</NavItem>
        <NavItem to="/favorites">Favoritos</NavItem>
      </NavItemGroup>

      <Link to="/" className="text-5xl font-extrabold text-blue-500 duration-300 hover:scale-105">
        StuCode
      </Link>

      <NavItemGroup>
        <NavItem to="/users"> Usuarios</NavItem>
        <NavItem to="/profile"> Perfil</NavItem>
      </NavItemGroup>
    </NavigationWrapper>
  );
}

export default Navbar;
