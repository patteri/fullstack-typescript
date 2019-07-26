require('dotenv').config();
import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, err => {
  if (err) {
    return console.log(err); // tslint:disable-line:no-console
  }

  return console.log(`server is listening on ${port}`); // tslint:disable-line:no-console
});
