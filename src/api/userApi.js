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

export const fetchHeroSection = async () => {
  try {
    const res = await axiosInstance.get("/hero_section");

    // API returns an array → return only the first object
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data[0];
    }

    return null; // if empty
  } catch (err) {
    console.error("Error fetching hero section:", err);
    throw err;
  }
};

export const fetchAboutUs = async () => {
  try {
    const res = await axiosInstance.get("/aboutus");

    // API returns an array → return only the first document
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data[0];
    }

    return null; // If empty
  } catch (err) {
    console.error("Error fetching About Us section:", err);
    throw err;
  }
};

export const fetchCoreValues = async () => {
  try {
    const res = await axiosInstance.get("/corevalues");

    // API returns an array of core values
    if (Array.isArray(res.data)) {
      return res.data;
    }

    return [];
  } catch (err) {
    console.error("Error fetching core values:", err);
    throw err;
  }
};

export const fetchContactDetails = async () => {
  try {
    const res = await axiosInstance.get("/contactdetails");

    // API RETURNS AN ARRAY → return first item
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data[0];
    }

    return null;
  } catch (err) {
    console.error("Error fetching contact details:", err);
    throw err;
  }
};

export const fetchJourneyTimeline = async () => {
  try {
    const res = await axiosInstance.get("/journey");

    // API returns an array of journey items
    if (Array.isArray(res.data)) {
      return res.data;
    }

    return [];
  } catch (err) {
    console.error("Error fetching journey timeline:", err);
    throw err;
  }
};

export const fetchInfra = async () => {
  try {
    const res = await axiosInstance.get("/infra");

    // If API returns an array → return the array
    if (Array.isArray(res.data)) {
      return res.data;
    }

    // If API returns a single object → return the object
    if (res.data && typeof res.data === "object") {
      return res.data;
    }

    return [];
  } catch (err) {
    console.error("Error fetching infrastructure data:", err);
    throw err;
  }
};

export const fetchFacilities = async () => {
  try {
    const res = await axiosInstance.get("/facilities");

    // API returns an array of facility objects
    if (Array.isArray(res.data)) {
      return res.data;
    }

    return [];
  } catch (err) {
    console.error("Error fetching facilities:", err);
    throw err;
  }
};

export const fetchPolicies = async () => {
  try {
    const res = await axiosInstance.get("/policies");

    // API returns an array of policies
    if (Array.isArray(res.data)) {
      return res.data;
    }

    return [];
  } catch (err) {
    console.error("Error fetching policies:", err);
    throw err;
  }
};

export const fetchPolicyById = async (id) => {
  try {
    const res = await axiosInstance.get(`/policies/${id}`);

    // API returns a single policy object
    if (res.data) {
      return res.data;
    }

    return null;
  } catch (err) {
    console.error(`Error fetching policy with ID ${id}:`, err);
    throw err;
  }
};

export const fetchHomeAbout = async () => {
  try {
    const res = await axiosInstance.get("/homeabout");

    // API returns an array → return only the first document
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data[0];
    }

    return null; // fallback if no data
  } catch (err) {
    console.error("Error fetching home about section:", err);
    throw err;
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const payload = { email }; // API expects { email: "" }

    const res = await axiosInstance.post("/newsletter", payload);

    return res.data; // return success message or API response
  } catch (err) {
    console.error("Error subscribing to newsletter:", err);
    throw err;
  }
};
