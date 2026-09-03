# Live Admin Setup

The admin portal is available at `/admin`.

To make Save publish changes on Cloudflare:

1. Create a Cloudflare KV namespace for website content.
2. Bind it to the Worker/Pages project with this exact binding name:

```text
SHESHAAN_CONTENT
```

3. Add this environment variable with a private passcode:

```text
SHESHAAN_ADMIN_PASSCODE
```

4. Redeploy the website.
5. Open `/admin`, enter the same passcode, edit content, and click Save.

Public product and blog pages read from the live content store and fall back to built-in content when the KV binding has no saved data yet.

Product images currently support existing bundled images or public image URLs. For direct file uploads from the admin portal, add a Cloudflare R2 bucket in the next phase.
