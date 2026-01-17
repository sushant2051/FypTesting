import { Fragment } from "react";
import MenuItems from "./MenuItems";
import Logout from "./Logout";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  return (
    <Fragment>
      {isOpen && (
        <div
          data-testid="overlay"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-64 transform space-y-4 bg-white px-4 shadow-xl transition-transform duration-300 dark:bg-gray-900 ${isOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex flex-col gap-2">
          <p>Test User</p>
        </div>
        <MenuItems onClose={onClose} />
        <Logout />
      </div>
    </Fragment>
  );
};

export default MobileNav;
