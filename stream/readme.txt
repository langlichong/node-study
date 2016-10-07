
## 可以直接利用pip拷贝文件

fs.createReadStream('a.txt').pip(fs.createWriteStream('./a-bak.txt'));