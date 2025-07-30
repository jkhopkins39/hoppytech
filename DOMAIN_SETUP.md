# Custom Domain Setup Guide for hoppytech.com

## Overview
This guide will help you configure your Namecheap domain `hoppytech.com` to work with your Vercel deployment.

## DNS Configuration Required

You have two options for configuring your domain. **Option A (Recommended)** is simpler and keeps your domain management in Namecheap.

### Option A: Add DNS Records in Namecheap (Recommended)

1. **Log into your Namecheap account**
2. **Go to Domain List** and click **Manage** next to `hoppytech.com`
3. **Click on the "Advanced DNS" tab**
4. **Add the following DNS records:**

#### For the root domain (hoppytech.com):
```
Type: A Record
Host: @ (or leave blank)
Value: 76.76.21.21
TTL: Automatic
```

#### For the www subdomain (www.hoppytech.com):
```
Type: A Record
Host: www
Value: 76.76.21.21
TTL: Automatic
```

#### Optional: Redirect www to non-www (or vice versa)
If you want to redirect `www.hoppytech.com` to `hoppytech.com`, add:
```
Type: CNAME Record
Host: www
Value: hoppytech.com
TTL: Automatic
```

### Option B: Change Nameservers to Vercel

If you prefer to manage DNS through Vercel:

1. **In Namecheap:**
   - Go to Domain List → Manage → Domain
   - Click "Nameservers" dropdown
   - Select "Custom DNS"
   - Replace the nameservers with:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`

2. **In Vercel:**
   - The domain will automatically be configured

## Verification Steps

1. **Wait for DNS propagation** (can take up to 48 hours, usually much faster)
2. **Check domain status in Vercel:**
   ```bash
   vercel domains ls
   ```
3. **Test your domain:**
   - Visit `https://hoppytech.com`
   - Visit `https://www.hoppytech.com`

## Troubleshooting

### If the domain doesn't work after 24 hours:
1. Check DNS propagation: https://www.whatsmydns.net/
2. Verify DNS records are correct in Namecheap
3. Check Vercel domain status in your dashboard

### Common Issues:
- **SSL Certificate**: Vercel automatically provides SSL certificates
- **Redirects**: Configure redirects in Vercel dashboard if needed
- **Caching**: Clear browser cache if changes don't appear

## Vercel Dashboard Configuration

You can also manage your domain through the Vercel web dashboard:

1. Go to https://vercel.com/dashboard
2. Select your project (`jkhopkins39-github-io`)
3. Click on "Settings" → "Domains"
4. Add and configure your domains there

## Final Notes

- Your site will be accessible at both `hoppytech.com` and `www.hoppytech.com`
- Vercel automatically handles SSL certificates
- DNS changes can take up to 48 hours to propagate globally
- You can set up redirects in Vercel to prefer one version over the other

## Quick Commands

```bash
# Check domain status
vercel domains ls

# Remove a domain if needed
vercel domains rm hoppytech.com

# Deploy with custom domain
vercel --prod
``` 