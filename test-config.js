// Test Configuration - Update these credentials for your environment
module.exports = {
  // Login Credentials
  login: {
    countryCode: '91',
    phone: '9347372054',
    otp: '123456', // Default OTP (change if needed)
  },

  // Base URL
  baseUrl: 'https://mycommunitysales.com',

  // Timeouts (in milliseconds)
  timeouts: {
    short: 3000,
    medium: 5000,
    long: 10000,
    page: 30000,
  },

  // Test Configuration
  test: {
    headless: false,
    slowMo: 100, // Add 100ms delay between actions (useful for debugging)
    screenshot: true, // Auto-capture screenshots
    video: 'retain-on-failure', // Keep videos on test failure
  },

  // Retry Configuration
  retry: {
    enabled: true,
    attempts: 3,
    delay: 1000,
  },

  // Marketplace Test Data
  marketplace: {
    searchTerm: 'teddy bear',
    priceRange: {
      min: 100,
      max: 1000,
    },
  },

  // Form Test Data
  forms: {
    testEmail: 'test@example.com',
    testName: 'Test User',
    testMessage: 'This is a test message',
  },

  // Vendor Test Data
  vendor: {
    testListingTitle: 'Test Listing',
    testListingDescription: 'Test listing description',
    testListingPrice: '599',
  },

  // API Configuration (if needed)
  api: {
    baseUrl: 'https://api.mycommunitysales.com',
    timeout: 5000,
  },
};
