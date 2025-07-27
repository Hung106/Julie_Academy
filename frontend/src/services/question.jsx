const API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000/api";
const QUESTIONS_ENDPOINT = `${API_URL}/questions`;

/**
 * API - Tạo một câu hỏi mới.
 * @param {object} questionData - 
 * @param {string} token - 
 * @returns {Promise<object>} 
 */
export const createQuestion = async (questionData, token) => {
  try {
    const response = await fetch(QUESTIONS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(questionData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi tạo câu hỏi:", error);
    throw error;
  }
};

/**
 * API - Lấy danh sách câu hỏi (có phân trang và lọc).
 * @param {object} params - Các tham số lọc (ví dụ: { page: 1, limit: 10 }).
 * @param {string} token - Token xác thực từ Keycloak.
 * @returns {Promise<object>} Object chứa danh sách câu hỏi và thông tin meta.
 */
export const getQuestions = async (params = {}, token) => {
  // Chuyển object params thành query string
  const queryParams = new URLSearchParams(params).toString();
  const url = `${QUESTIONS_ENDPOINT}?${queryParams}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi lấy danh sách câu hỏi:", error);
    throw error;
  }
};

/**
 * API - Lấy chi tiết một câu hỏi bằng ID.
 * @param {string} questionId - ID của câu hỏi.
 * @param {string} token - Token xác thực từ Keycloak.
 * @returns {Promise<object>} Dữ liệu chi tiết của câu hỏi.
 */
export const getQuestionById = async (questionId, token) => {
  try {
    const response = await fetch(`${QUESTIONS_ENDPOINT}/${questionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Lỗi lấy câu hỏi ID ${questionId}:`, error);
    throw error;
  }
};

/**
 * API - Cập nhật một câu hỏi.
 * @param {string} questionId - ID của câu hỏi cần cập nhật.
 * @param {object} updatedData - Dữ liệu mới của câu hỏi.
 * @param {string} token - Token xác thực từ Keycloak.
 * @returns {Promise<object>} Dữ liệu câu hỏi đã được cập nhật.
 */
export const updateQuestion = async (questionId, updatedData, token) => {
  try {
    const response = await fetch(`${QUESTIONS_ENDPOINT}/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Lỗi cập nhật câu hỏi ID ${questionId}:`, error);
    throw error;
  }
};

/**
 * API - Xóa một câu hỏi.
 * @param {string} questionId - ID của câu hỏi cần xóa.
 * @param {string} token - Token xác thực từ Keycloak.
 */
export const deleteQuestion = async (questionId, token) => {
  try {
    const response = await fetch(`${QUESTIONS_ENDPOINT}/${questionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Request DELETE thành công thường trả về status 204 No Content
    if (!response.ok && response.status !== 204) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Không cần trả về body vì thường là rỗng
    return;
  } catch (error) {
    console.error(`Lỗi xóa câu hỏi ID ${questionId}:`, error);
    throw error;
  }
};