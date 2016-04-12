var fs = require('fs');

function writeName(_list){
  var _nameList = _list.map(function (file) {
    return '@import "' + file + '"'
  })
  var _str =  _nameList.join(';\n');
  fs.writeFile('src/assets/main.scss', _str, function (err) {
  	if (err){
  		console.log(err);
  	}
   });
}

(function main() {
  var totalList = fs.readdirSync("src/assets/variables").map(function (file) {
    return "./variables/" + file
  })
  .concat(fs.readdirSync("src/assets/mixins").map(function (file) {
    return "./mixins/" + file
  }))
  .concat(['./_base.scss'])
  .concat(fs.readdirSync("src/assets/states").map(function (file) {
    return "./states/" + file
  }))
  .concat(fs.readdirSync("src/assets/modules").map(function (file) {
    return "./modules/" + file
  }))
  .concat(fs.readdirSync("src/assets/layout").map(function (file) {
    return "./layout/" + file
  }))
  writeName(totalList);
}).call(this);
