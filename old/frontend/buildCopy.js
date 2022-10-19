const fs = require('fs')
const fse = require ('fs-extra')
const path = require('path');
const copyFrom = path.resolve(__dirname, 'dist')
const parent = path.resolve(__dirname,'..');
const copyTo = path.resolve(parent+path.sep+'backend'+path.sep+'public');

let copyFile = async () => {
    try{
        let filesToDelete = await fs.readdirSync(copyTo);
        for(const file of filesToDelete){
            await fs.unlinkSync(path.join(copyTo, file));
        }
        let filesToCopy = await fs.readdirSync(copyFrom);
        for(const file of filesToCopy){
            await fse.copyFileSync(copyFrom+path.sep+file, copyTo+path.sep+file);
        }
    }catch(err){
        console.log(err)
    }
}
copyFile();