import fs from "fs"

export const deleteFile = (path) => {
    console.log(path)
    fs.unlink(path, ((err) => {
        if(err){
            console.log("Error in File Deletion(From Server):")
            console.log(err)
            throw new Error("Error in file Deletion.")
        }
    }))
}
