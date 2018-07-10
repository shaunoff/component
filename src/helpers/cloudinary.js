import cloudinary from 'cloudinary-core'

const cl = new cloudinary.Cloudinary({cloud_name: "pbxx-dev", secure: true});

export default cl
