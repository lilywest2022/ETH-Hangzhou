const fs = require("fs")
import path from "path"

function skimVideotoRecord(id, platform) {
    const record = { videoId: id, platForm: platform }
    const filePath = "../constants/data.json"

    const jsonContent = JSON.stringify(record)

    fs.writeFile(filePath, jsonContent, "utf8", (err) => {
        if (err) {
            console.error("写入文件时发生错误：", err)
        } else {
            console.log("记录成功。")
            mergeRecords(filePath)
        }
    })
}

function mergeRecords() {
    const filePath = "../../constants/hashRecords.json"
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("读取文件时发生错误：", err)
            return
        }

        let records
        try {
            records = JSON.parse(data)
        } catch (err) {
            console.error("解析JSON时发生错误：", err)
            return
        }

        let found = false

        records.forEach((record) => {
            if (record.videoId === id && record.platForm === platform) {
                record.playnumber = (record.playnumber || 0) + 1
                found = true
            }
        })

        if (!found) {
            records.push({ videoId: id, platForm: platform, playnumber: 1 })
        }

        const updatedData = JSON.stringify(records)

        fs.writeFile(filePath, updatedData, "utf8", (err) => {
            if (err) {
                console.error("写入文件时发生错误：", err)
            } else {
                console.log("文件更新成功。")

                // 清空文件内容
                fs.truncate(filePath, 0, (err) => {
                    if (err) {
                        console.error("清空文件内容时发生错误：", err)
                    } else {
                        console.log("文件内容已清空。")
                    }
                })
            }
        })
    })
}

function hashRecords(hash, id, platform) {
    const filePath = path.join(
        "/home/ubuntu/code/ETHhangzhou/CUIT-Squad-ETH-Hangzhou/nextjs",
        "./constants/hashRecord.json"
    )
    const data = { hash, id, platform }
    fs.readFile(filePath, "utf8", (err, jsonString) => {
        if (err) {
            console.error(err)
            return
        }

        let records = []

        try {
            records = JSON.parse(jsonString)
        } catch (err) {
            console.error(err)
        }

        records.push(data)

        fs.writeFile(filePath, JSON.stringify(records), (err) => {
            if (err) {
                console.error(err)
            } else {
                console.log("Hash record saved successfully")
            }
        })
    })
}

export { hashRecords }
