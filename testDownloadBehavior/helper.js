import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url)

// Ensure that the download directory specified here
// matches the directory you've set in capabilities.
const downloadDirectory = path.dirname(__filename)

const expectedFileName = "1KiB.bin"
const filePath = `${downloadDirectory}/${expectedFileName}`

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