export const uploadImage = async (images: any) => {
  let newImage = [];

  for (const img of images) {
    const formData = new FormData();

    formData.append("file", img);

    formData.append("cloud_name", "djvtqmizy");
    formData.append("upload_preset", "zbcecmdi");

    const res = await fetch("http://api.cloudinary.com/v1_1/djvtqmizy/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    newImage.push({
      url: data.secure_url,
    });
  }
  return newImage;
};
