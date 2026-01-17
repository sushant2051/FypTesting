import { NavLink, useLocation } from "react-router";

interface MenuLinkProps {
  route: string;
  icon?: string;
  label: string;
  onClose?: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  route,
  //   icon,
  label,

  onClose,
}) => {
  const location = useLocation();

  const isActive = route && location.pathname === route;

  return (
    <div>
      <div
        className={`
          hover:bg-neutral-20 flex cursor-pointer items-center rounded-md p-1",
          ${isActive && "bg-neutral-200"}`}
      >
        <NavLink
          to={route!}
          className="flex w-full cursor-pointer items-center gap-2"
          onClick={onClose}
        >
          {/* {icon && <div name={icon} />} */}
          {label}
        </NavLink>
      </div>
    </div>
  );
};

export default MenuLink;
