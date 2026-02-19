import { prisma } from "db";
import styles from "./page.module.css";

export default async function Home() {
  const users = await prisma.user.findMany();
  return <div className={styles.page}>{JSON.stringify(users)}</div>;
}

// if any one of these is there, then the page will not be statically generated, it will get revalidated every {duration} seconds and we don't need ARGS in Dockerfile. Whenever we need database connection during nextjs build phase we use docker --build_arg DATABASE_URL in order to pass the argument while running the docker build command
export const revalidate = 60;
// export const dynamic = "force-dynamic";
