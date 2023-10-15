import Link from "next/link"
import Header from "../components/Header"

function UploadPage() {
    const onUpload = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })

        const data = await response.json()
        console.log(data)
    }
    const onUploadimg = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })

        const data = await response.json()
        console.log(data)
    }

    return (
        <div className="container mx-auto p-4">
            <Header />

            <br />
            <form onSubmit={onUpload} encType="multipart/form-data">
                <div className="mb-4">
                    <label htmlFor="video" className="font-bold">
                        上传视频
                    </label>
                    <input type="file" id="video" name="上传视频" className="border rounded p-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="cover" className="font-bold">
                        上传封面
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="cover"
                        name="image"
                        className="border rounded p-2"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        上传视频
                    </button>
                </div>
            </form>

            <Link href="/">
                <p className="mt-4 text-center text-blue-500 underline cursor-pointer">返回首页</p>
            </Link>
        </div>
    )
}

export default UploadPage
