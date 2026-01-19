import axiosInstance from "./axiosInstance";

export const fetchDepartments = async () => {
  try {
    const res = await axiosInstance.get("/departments");
    console.log("✅ API response:", res.data);

    let list = [];

    // Handle different response structures
    if (Array.isArray(res.data)) {
      list = res.data;
    } else if (Array.isArray(res.data?.data)) {
      list = res.data.data;
    } else {
      console.warn("⚠️ Unexpected response structure:", res.data);
      return [];
    }

    // 🔥 Return only active departments
    const activeDepartments = list.filter((dept) => dept.isactive === true);

    return activeDepartments;
  } catch (error) {
    console.error(
      "❌ fetchDepartments error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch departments"
    );
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
    console.error(
      "❌ Error fetching doctors:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch doctors");
  }
};

export const getDoctorById = async (id) => {
  const res = await axiosInstance.get(`/doctors/${id}`);
  return res.data.data || res.data;
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
    console.error(
      "❌ Error fetching blogs:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch blogs");
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await axiosInstance.get(`/blogs/${id}`);
    console.log("📄 Single blog:", res.data);

    if (res.data) return res.data;
    if (res.data?.data) return res.data.data;

    return null;
  } catch (err) {
    console.error("❌ Error fetching blog by ID:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch blog");
  }
};

export const getGallery = async () => {
  try {
    const response = await axiosInstance.get("/gallery");
    console.log("✅ getGallery response:", response.data);

    let items = [];

    // Normalize different possible response structures
    if (Array.isArray(response.data)) {
      items = response.data;
    } else if (Array.isArray(response.data?.data)) {
      items = response.data.data;
    } else if (Array.isArray(response.data?.gallery)) {
      items = response.data.gallery;
    } else {
      console.warn("Unexpected response structure:", response.data);
      return [];
    }

    const filteredItems = items.filter(
      (item) => item.filepath && item.filepath.trim() !== ""
    );

    return filteredItems;
  } catch (error) {
    console.error(
      "❌ Error fetching gallery:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch gallery items"
    );
  }
};

export const getAllFeedback = async () => {
  try {
    const response = await axiosInstance.get("/feedback");
    console.log("✅ Successfully fetched all feedback");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching all feedback:", error);
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

export const fetchDepartmentById = async (departmentId) => {
  try {
    console.log(`🔍 Fetching department with ID: ${departmentId}...`);

    const res = await axiosInstance.get(`/departments/${departmentId}`);
    console.log("✅ fetchDepartmentById response:", res.data);

    // Handle different possible structures
    if (res.data && typeof res.data === "object" && !Array.isArray(res.data)) {
      return res.data; // direct object response
    }

    if (res.data?.data && typeof res.data.data === "object") {
      return res.data.data; // { data: { ...department } }
    }

    console.warn("⚠️ Unexpected response structure:", res.data);
    return null;
  } catch (error) {
    console.error(
      "❌ fetchDepartmentById error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch department details"
    );
  }
};

export const getDoctorsByDepartment = async (departmentId) => {
  try {
    console.log(`🔍 Fetching doctors for department ID: ${departmentId}...`);

    const res = await axiosInstance.get(`/doctors/department/${departmentId}`);
    console.log("✅ getDoctorsByDepartment response:", res.data);

    // Handle all possible array response patterns
    if (Array.isArray(res.data)) {
      return res.data;
    }

    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }

    if (res.data?.doctors && Array.isArray(res.data.doctors)) {
      return res.data.doctors;
    }

    console.warn("⚠️ Unexpected response structure:", res.data);
    return [];
  } catch (error) {
    console.error(
      "❌ getDoctorsByDepartment error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch doctors for this department"
    );
  }
};

export const getExperts = async () => {
  try {
    const res = await axiosInstance.get("/doctors/experts");
    console.log("✅ getExperts response:", res.data);

    // API always returns a clean array → directly return it
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("❌ getExperts error:", error);
    throw new Error("Failed to fetch expert doctors");
  }
};


/* =======================
   GET ALL APPROVED FEEDBACKS
======================= */
export const getFeedbacks = async () => {
  try {
    const response = await axiosInstance.get("/feedback?isapproved=true");
    console.log("✅ getFeedbacks response:", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(
      "❌ Error fetching feedbacks:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch feedbacks"
    );
  }
};

/* =======================
   GET ALL FEEDBACKS (ADMIN)
======================= */
export const getAllFeedbacks = async () => {
  try {
    const response = await axiosInstance.get("/feedback");
    console.log("✅ getAllFeedbacks response:", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(
      "❌ Error fetching all feedbacks:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch feedbacks"
    );
  }
};

/* =======================
   GET FEEDBACK BY ID
======================= */
export const getFeedbackById = async (id) => {
  try {
    const response = await axiosInstance.get(`/feedback/${id}`);
    console.log("✅ getFeedbackById response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching feedback:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch feedback"
    );
  }
};

/* =======================
   CREATE FEEDBACK
======================= */
export const createFeedback = async (payload) => {
  try {
    const response = await axiosInstance.post("/feedback", payload);
    console.log("✅ createFeedback response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error creating feedback:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create feedback"
    );
  }
};

/* =======================
   UPDATE FEEDBACK
======================= */
export const updateFeedback = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/feedback/${id}`, payload);
    console.log("✅ updateFeedback response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error updating feedback:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update feedback"
    );
  }
};

/* =======================
   DELETE FEEDBACK
======================= */
export const deleteFeedback = async (id) => {
  try {
    const response = await axiosInstance.delete(`/feedback/${id}`);
    console.log("✅ deleteFeedback response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error deleting feedback:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to delete feedback"
    );
  }
};

/* =======================
   APPROVE FEEDBACK
======================= */
export const approveFeedback = async (id) => {
  try {
    const response = await axiosInstance.put(`/feedback/${id}`, {
      isapproved: true,
    });
    console.log("✅ approveFeedback response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error approving feedback:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to approve feedback"
    );
  }
};