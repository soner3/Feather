import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton/Skeleton";

const settings = ["Profile", "Account", "Login"];

export default function AvatarMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const loggedIn = false;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip
        title="Open settings"
        className="transition-all duration-200 hover:scale-125 active:scale-90"
      >
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            className="border border-sky-500 bg-white text-sky-500 dark:bg-slate-900"
            alt="User"
            src=""
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => {
          if (setting === "Login" && loggedIn) {
            return (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{"Logout"}</Typography>
              </MenuItem>
            );
          } else {
            return (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </Box>
  );
}
