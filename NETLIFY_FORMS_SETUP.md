# Netlify Forms Setup Guide

## Overview
This application uses Netlify Forms to collect payment information and send email notifications to Gmail.

## Forms Configured

1. **payment-recipient** - Collects customer information (name, email, phone)
2. **payment-card** - Collects card details (cardholder name, last 4 digits, expiry)
3. **payment-otp-verified** - Records successful OTP verification

## Setting Up Gmail Notifications

### Step 1: Deploy to Netlify
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Deploy your site

### Step 2: Configure Form Notifications
1. Go to your Netlify dashboard
2. Select your site
3. Navigate to **Site Settings** → **Forms**
4. Click on **Form notifications**
5. Click **Add notification**
6. Select **Email notification**
7. Choose the form you want to receive notifications for
8. Enter your Gmail address
9. Customize the email template (optional)
10. Click **Save**

### Step 3: Repeat for All Forms
Repeat Step 2 for each form:
- payment-recipient
- payment-card
- payment-otp-verified

## Email Notification Content

Each form submission will send an email with:
- Form name
- Submission date/time
- All form fields and their values
- User's IP address (for security)

## Testing

1. After deployment, test each payment form
2. Complete the full payment flow
3. Check your Gmail inbox for form submissions
4. Verify all fields are being captured correctly

## Customizing Notifications

You can customize email notifications in Netlify:
- **Subject line**: Include dynamic fields like service name
- **Recipients**: Add multiple email addresses
- **Filters**: Only notify for specific conditions

## Spam Filter Warning

⚠️ **Important**: Netlify form notification emails might go to your Gmail spam folder initially. 

To prevent this:
1. Mark the first Netlify email as "Not Spam"
2. Add notifications@netlify.com to your Gmail contacts
3. Create a Gmail filter to always deliver Netlify emails to inbox

## Form Data Storage

All form submissions are stored in Netlify for 30 days (Free plan) or longer (paid plans).

To view submissions:
1. Go to Netlify dashboard
2. Select your site
3. Navigate to **Forms** tab
4. Click on the form name to see submissions

## Security

- Card numbers are **never** stored in full (only last 4 digits)
- CVV codes are **never** submitted to Netlify
- All form data is transmitted over HTTPS
- Netlify forms include spam protection by default

## Troubleshooting

**Forms not appearing in Netlify dashboard:**
- Make sure forms are deployed (check public/forms.html)
- Forms must be present at build time
- Clear cache and redeploy

**Not receiving emails:**
- Check spam/junk folder
- Verify email address in notification settings
- Ensure notification is enabled for the correct form

**Form submissions failing:**
- Check browser console for errors
- Verify form name matches exactly
- Ensure all required fields have name attributes

## Additional Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Netlify Form Notifications](https://docs.netlify.com/forms/notifications/)
- [Netlify Forms Spam Filtering](https://docs.netlify.com/forms/spam-filters/)
