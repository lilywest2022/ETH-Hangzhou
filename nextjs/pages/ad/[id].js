// pages/ad/adpage/[id].js

import { useRouter } from "next/router"

function AdPage() {
    const router = useRouter()
    const { id } = router.query

    if (!id) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Playing Ad Video {id}</h1>
            <video width="640" height="360" controls autoPlay>
                <source src={`/ad/advideo/${id}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default AdPage
