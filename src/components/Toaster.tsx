import { Box, Snackbar } from "@mui/material";

interface ToasterProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const Toaster: React.FC<ToasterProps> = ({ open, message, onClose }) => {
  const vertical = "bottom";
  const horizontal = "right";
  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        message={message}
        anchorOrigin={{ vertical, horizontal }}
      />
    </Box>
  );
};
