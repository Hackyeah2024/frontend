import { auth } from "@clerk/nextjs/server";
import { UploadVideo } from "@/widgets";

export default function Home() {
  const { userId } = auth();

  console.log("userId", userId);

  return (
    <section>
      <p>This is home page. User ID: {userId}</p>
      <UploadVideo />
    </section>
  );
}
