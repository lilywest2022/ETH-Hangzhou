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