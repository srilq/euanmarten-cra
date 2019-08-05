// WIP

const path = require('path');
const gm = require('gm');

const BASE_PATH = path.join('build', 'images');

const splitFileExtension = filename => filename.split('.');

const resizeImage = (filename, width) => {
  const [imageName, imageExtension] = splitFileExtension(filename);

  return gm(path.join(BASE_PATH, filename))
    .resize(width)
    .write(
      path.join(BASE_PATH, `${imageName}_${width}.${imageExtension}`),
      (err) => {
        if (err) {
          throw err;
        }
      });
};

resizeImage('bilbo.jpg', 100);
resizeImage('bilbo.jpg', 200);
resizeImage('bilbo.jpg', 300);
resizeImage('bilbo.jpg', 400);
resizeImage('bilbo.jpg', 500);
