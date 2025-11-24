import axiosInstance from "./axiosInstance";

// ✅ Fetch all departments
export const fetchDepartments = async () => {
  try {
    const res = await axiosInstance.get("/departments");
    console.log("✅ API response:", res.data);

    // Handle different response structures
    if (res.data && Array.isArray(res.data)) {
      return res.data;
    } else if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }

    console.warn("⚠️ Unexpected response structure:", res.data);
    return [];
  } catch (error) {
    console.error("❌ fetchDepartments error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch departments");
  }
};

export const getDoctors = async () => {
  try {
    console.log("🔍 Fetching all doctors...");
    const response = await axiosInstance.get("/doctors");
    console.log("✅ Doctors fetched:", response.data);
    
    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    console.warn("⚠️ Unexpected response structure:", response.data);
    return [];
  } catch (error) {
    console.error("❌ Error fetching doctors:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch doctors");
  }
};


export const getBlogs = async () => {
  try {
    const response = await axiosInstance.get("/blogs?isactive=true");
    console.log("✅ getBlogs response:", response.data);
    
    // Handle different response structures
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data?.data)) return response.data.data;
    if (Array.isArray(response.data?.blogs)) return response.data.blogs;
    
    console.warn("Unexpected response structure:", response.data);
    return [];
  } catch (error) {
    console.error("❌ Error fetching blogs:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch blogs");
  }
};


export const getGallery = async () => {
  try {
    const response = await axiosInstance.get("/gallery");
    console.log("✅ getGallery response:", response.data);
    
    // Handle different response structures
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data?.data)) return response.data.data;
    if (Array.isArray(response.data?.gallery)) return response.data.gallery;
    
    console.warn("Unexpected response structure:", response.data);
    return [];
  } catch (error) {
    console.error("❌ Error fetching gallery:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch gallery items");
  }
};


export const getAllFeedback = async () => {
  try {
    const response = await axiosInstance.get("/feedback");
    console.log('✅ Successfully fetched all feedback');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching all feedback:', error);
    throw error;
  }
};

export const submitFeedback = async (data) => {
  try {
    const response = await axiosInstance.post("/feedback", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};


export const createContact = async (contactData) => {
  try {
    const response = await axiosInstance.post("/contact", contactData);
    return response.data; 
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};


export const createAppointment = async (appointmentData) => {
  try {
    const response = await axiosInstance.post("appointments", appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error.response?.data || error;
  }
};
