import config from './config';
import app from './app';

const { port } = config;

app.listen(port, err => {
  if (err) {
    return console.log(err); // tslint:disable-line:no-console
  }

  return console.log(`server is listening on ${port}`); // tslint:disable-line:no-console
});
