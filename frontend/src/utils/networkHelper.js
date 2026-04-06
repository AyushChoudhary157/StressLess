import axios from 'axios';

/**
 * Create an axios instance with retry logic and proper timeout handling
 * @param {number} timeout - Request timeout in milliseconds (default: 30000)
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @returns {axios.AxiosInstance}
 */
export const createAxiosInstance = (timeout = 30000, maxRetries = 3) => {
  const instance = axios.create({
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add timestamp to track request duration
      config.metadata = { startTime: new Date() };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor with retry logic
  instance.interceptors.response.use(
    (response) => {
      // Calculate request duration
      const duration = new Date() - response.config.metadata.startTime;
      console.log(`Request completed in ${duration}ms`);
      return response;
    },
    async (error) => {
      const config = error.config;

      // Initialize retry counter
      if (!config._retry) {
        config._retry = 0;
      }

      // Determine if we should retry
      const shouldRetry = 
        config._retry < maxRetries &&
        (error.code === 'ECONNABORTED' ||
          error.code === 'ETIMEDOUT' ||
          error.code === 'ENOTFOUND' ||
          error.code === 'ENETUNREACH' ||
          error.message.includes('Network Error') ||
          error.message.includes('timeout') ||
          (error.response && error.response.status >= 500));

      if (shouldRetry) {
        config._retry += 1;
        console.log(`Retrying request (${config._retry}/${maxRetries})...`);
        
        // Exponential backoff: wait longer between each retry
        const delay = Math.min(1000 * Math.pow(2, config._retry - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return instance(config);
      }

      // Enhance error message for better debugging
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        error.message = 'Request timed out. Please check your internet connection.';
      } else if (error.code === 'ENOTFOUND' || error.code === 'ENETUNREACH') {
        error.message = 'Cannot reach the server. Please check your internet connection.';
      } else if (error.response && error.response.status >= 500) {
        error.message = 'Server error. Please try again later.';
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Check if the API server is accessible
 * @param {string} apiUrl - The base API URL
 * @returns {Promise<boolean>}
 */
export const checkServerHealth = async (apiUrl) => {
  try {
    const instance = createAxiosInstance(5000, 1);
    const response = await instance.get(`${apiUrl}/health`);
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Server health check failed:', error.message);
    return false;
  }
};

/**
 * Check if the user has an active internet connection
 * @returns {boolean}
 */
export const isOnline = () => {
  return navigator.onLine;
};

/**
 * Wait for the network to become available
 * @param {number} maxWaitTime - Maximum time to wait in milliseconds (default: 10000)
 * @returns {Promise<boolean>}
 */
export const waitForNetwork = (maxWaitTime = 10000) => {
  return new Promise((resolve) => {
    if (isOnline()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    
    const checkConnection = () => {
      if (isOnline()) {
        window.removeEventListener('online', checkConnection);
        resolve(true);
      } else if (Date.now() - startTime >= maxWaitTime) {
        window.removeEventListener('online', checkConnection);
        resolve(false);
      }
    };

    window.addEventListener('online', checkConnection);
    
    // Also poll every second
    const interval = setInterval(() => {
      if (Date.now() - startTime >= maxWaitTime) {
        clearInterval(interval);
        window.removeEventListener('online', checkConnection);
        resolve(false);
      }
    }, 1000);
  });
};

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - The function to retry
 * @param {number} maxRetries - Maximum number of retries (default: 3)
 * @param {number} initialDelay - Initial delay in milliseconds (default: 1000)
 * @returns {Promise<any>}
 */
export const retryWithBackoff = async (fn, maxRetries = 3, initialDelay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        const delay = Math.min(initialDelay * Math.pow(2, i), 10000);
        console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};
