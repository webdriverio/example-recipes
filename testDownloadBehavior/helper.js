import fs from "fs"
import { downloadsDir } from "../wdio.browserChoice.conf"

const expectedFileName = "package.json"
const filePath = `${downloadsDir}/${expectedFileName}`

const deleteFileIfExists = () => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
    }
}

export default deleteFileIfExists
export {filePath}