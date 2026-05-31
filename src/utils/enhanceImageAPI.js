import axios from "axios";

const API_KEY = "wx0jwcy3sddxb0c7j";
const BASE_URL = "https://techhk.aoscdn.com";
const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async (file) => {
  const taskId = await uploadImage(file);
  console.log("Task ID:", taskId);

  const enhancedImageData = await pollForEnhancedImage(taskId);
  console.log("Final Enhanced Data:", enhancedImageData);

  return enhancedImageData;
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/tasks/visual/scale`,
      formData,
      {
        headers: {
          "X-API-KEY": API_KEY,
        },
      }
    );

    console.log("Upload Response:", data);

    if (data.status !== 200 || !data?.data?.task_id) {
      throw new Error(data.message || "Task ID not found");
    }

    return data.data.task_id;
  } catch (error) {
    console.log("Upload Status:", error.response?.status);
    console.log("Upload Error:", error.response?.data);
    throw error;
  }
};

const pollForEnhancedImage = async (taskId, retries = 0) => {
  const result = await fetchEnhancedImage(taskId);

  if (result.state === 4 || result.progress < 100) {
    if (retries >= MAXIMUM_RETRIES) {
      throw new Error("Max retries reached");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return pollForEnhancedImage(taskId, retries + 1);
  }

  const imageUrl =
    result.image ||
    result.image_url ||
    result.output ||
    result.result_url ||
    result.download_url;

  if (!imageUrl) {
    console.log("Final API Result:", result);
    throw new Error("Enhanced image URL not found");
  }

  return imageUrl;
};

const fetchEnhancedImage = async (taskId) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );

  console.log("Fetch Response:", data);

  if (data.status !== 200 || !data?.data) {
    throw new Error(data.message || "Failed to fetch enhanced image");
  }

  return data.data;
};