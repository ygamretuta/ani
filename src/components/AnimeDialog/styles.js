const styles = (theme) => ({
  card: {
    marginBottom: "30px",
    marginTop: "30px",
  },
  ratingBox: {
    display: "flex",
    alignItems: "center"
  },
  reviewsList : {
    width: '100%',
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});
  
export default styles;
