This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installing dependencies

```
npm install
```

### Run locally

If you have issues running frontend on https://hfe.k8s.techyon.dev, you can run the frontend locally.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want, you can also run the backend locally.

- Refer to the [backend README](../backend/README.md) for instructions on how to run the backend locally. You then will have it running on `http://localhost:5000`.
- To make the frontend use the local backend, run `npm run dev` and change the urls from `https://hbe.k8s.techyon.dev` to `http://localhost:5000` in the `upload-video.tsx` and `src/app/videos/[id]/page.tsx` files.
