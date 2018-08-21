export default validator => (req, res, next) => {
  validator(req.body)
    .then(() => next())
    .catch(error => res.status(400).json(error));
};
