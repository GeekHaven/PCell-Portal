import { Modal, Paper, Typography, Button } from '@mui/material';

export default function PopupModal({
  open,
  setOpen,
  onSubmit,
  title = 'Are you sure?',
  buttonTitle = 'Yes',
}) {
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={handleCancel} aria-label={title}>
      <Paper
        component="form"
        className="absolute flex flex-col gap-4 w-full max-w-xs md:max-w-sm top-1/4 left-1/2 p-4"
        sx={{
          backgroundColor: 'background.paper',
          transform: 'translate(-50%,-50%)',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
          handleCancel();
        }}
      >
        <Typography>{title}</Typography>
        <div className="flex flex-row justify-end gap-4">
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" color="primary">
            {buttonTitle}
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}
