const fs = require('fs')
const fse = require ('fs-extra')
const path = require('path');
const parent = path.resolve(__dirname,'..');
const copyFrom = path.resolve(parent+path.sep+'purnagun');
const copyTo = path.resolve(parent+path.sep+'shrouded-reaches-67662');

let copyFile = async () => {
    try{
        let filesToCopy = await fs.readdirSync(copyFrom);
        for(const file of filesToCopy){
            if(file === '.git' || file === 'node_modules'){
                continue
            }
            await fse.remove(copyTo+path.sep+file);
            await fse.copy(copyFrom+path.sep+file, copyTo+path.sep+file)
        }
    }catch(err){
        console.log(err)
    }
}
copyFile();