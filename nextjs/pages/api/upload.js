import { IncomingForm } from "formidable"
import fs, { readdirSync } from "fs"
import path from "path"
import crypto from "crypto"
import mintERC721 from "../../server/onblockchain/mintErc721"

export const config = {
    api: {
        bodyParser: false, // Disabling body parser
    },
}

async function findNextVideoId() {
    let maxId = -1
    const files = fs.readdirSync("./public/videos")

    files.forEach((filename) => {
        if (filename.endsWith(".mp4")) {
            const fileId = parseInt(path.parse(filename).name)
            if (!isNaN(fileId)) {
                maxId = Math.max(maxId, fileId)
            }
        }
    })
    return maxId + 1
}
async function findNextPicId() {
    let maxId = -1
    const files = fs.readdirSync("./public/thumbnails")

    files.forEach((filename) => {
        if (filename.endsWith(".jpg")) {
            const fileId = parseInt(path.parse(filename).name)
            if (!isNaN(fileId)) {
                maxId = Math.max(maxId, fileId)
            }
        }
    })
    return maxId + 1
}

export default async (req, res) => {
    if (req.method === "POST") {
        // Generate a unique timestamp for this request
        const timestamp = Date.now().toString()

        const form = new IncomingForm({
            uploadDir: "./public",
            keepExtensions: true,
        })

        form.on("fileBegin", (name, file) => {
            // Set the file path where the uploaded file will be saved
            // console.log(file)
            if (file.mimetype === "video/mp4") {
                const ID = findNextVideoId()
                const filePath = `./public/videos/${ID}.mp4`
                file.path = filePath
            } else if (file.mimetype === "image/jpeg") {
                const ID = findNextVideoId()
                const filePath = `./public/thumbnails/${ID}.jpg`
                file.path = filePath
            } else {
                // Unsupported file type
                return res.status(400).json({ error: "Unsupported file type" })
            }
        })

        form.on("error", (err) => {
            console.error(err)
            return res.status(500).json({ error: "Failed to upload file" })
        })

        form.on("file", async (name, file) => {
            // Generate a unique ID for the video
            const videoId = await findNextVideoId()
            const picId = await findNextPicId()

            // Rename the uploaded file to the video ID
            if (file.mimetype === "video/mp4") {
                const newFilePath = path.join(
                    __dirname,
                    "../../../../public/videos",
                    `${videoId}.mp4`
                )

                fs.rename(file.filepath, newFilePath, (err) => {
                    if (err) {
                        console.error(err)
                        return res.status(500).json({ error: "Failed to rename file" })
                    }

                    console.log("File write success")

                    res.status(200).json({
                        name: videoId,
                        path: `/videos/${videoId}.mp4`,
                    })
                })
            } else if (file.mimetype === "image/jpeg") {
                console.log("this is a pic@!")

                const newFilePath = path.join(
                    __dirname,
                    "../../../../public/thumbnails",
                    `${picId}.jpg`
                )

                console.log(file.filepath, newFilePath)

                fs.rename(file.filepath, newFilePath, async (err) => {
                    if (err) {
                        console.error(err)
                        return res.status(500).json({ error: "Failed to rename file" })
                    }

                    console.log("File write success")
                    const ERC721_hash = generateUniqueHash()
                    await mintERC721(ERC721_hash)

                    res.status(200).json({
                        name: videoId,
                        path: `/thumbnails/${picId}.jpg`,
                    })
                })
            }
        })

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
        })
    } else {
        res.status(405).json({ error: "Method not allowed" })
    }
}

function generateUniqueHash() {
    const currentTimestamp = Date.now().toString()
    const randomValue = Math.random().toString()

    const hash = crypto
        .createHash("sha256")
        .update(currentTimestamp + randomValue)
        .digest("hex")

    return hash
}
