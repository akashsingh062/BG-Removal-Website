import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";

// controller function to remove background of image
const removeBgImage = async (req, res) => {
  let imagePath = null;
  try {
    const { clerkId } = req;

    let user = await userModel.findOne({ clerkId });
    if (!user) {
      user = await userModel.create({
        clerkId,
        email: `${clerkId}@placeholder.com`,
        photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        creditBalance: 3
      });
    }

    if (user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    imagePath = req.file.path;

    // Build multipart/form-data body with the image file stream
    const form = new FormData();
    form.append("image", fs.createReadStream(imagePath));
    form.append("image-bg", "");
    form.append("url", "");
    form.append("url-bg", "");

    const { data } = await axios.post(
      "https://background-removal4.p.rapidapi.com/v1/results",
      form,
      {
        params: { mode: "fg-image" },
        headers: {
          ...form.getHeaders(),
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      }
    );

    // Validate API response
    const result = data.results?.[0];
    if (!result || result.status.code !== "ok") {
      const errorMsg = result?.status?.message || "Background removal failed";
      return res.json({ success: false, message: errorMsg });
    }

    // The API returns base64-encoded PNG in entities[0].image
    const resultBase64 = result.entities[0].image;
    const resultImage = `data:image/png;base64,${resultBase64}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
      message: "Background Removed",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  } finally {
    // Ensure the temp file is cleaned up in all execution paths
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlink(imagePath, () => {});
    }
  }
};

export { removeBgImage };