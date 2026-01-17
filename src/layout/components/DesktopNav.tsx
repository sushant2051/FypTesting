import Logout from "./Logout";
import MenuItems from "./MenuItems";

const DesktopNav = () => {
  return (
    <div className="z-50 hidden md:flex">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-4">
          <p>Test User</p>
        </div>
        <MenuItems />
        <Logout />
      </div>
    </div>
  );
};

export default DesktopNav;
