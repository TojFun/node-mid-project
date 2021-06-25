const jsonfile = require("jsonfile");

class JSONFile {
  constructor(filename) {
    this.path = `./data/json/${filename}.json`;
  }

  get = () => {
    return new Promise((resolve, reject) => {
      jsonfile.readFile(this.path, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };

  put = (data) => {
    return new Promise((resolve, reject) => {
      jsonfile.writeFile(this.path, data, (err) => {
        if (err) reject(err);
        else resolve({ ok: true });
      });
    });
  };

  update = async (callback) => {
    const data = await this.get();

    const updatedData = callback(data);

    await this.put(updatedData);
  };
}

module.exports = JSONFile;
