export async function update(project: string, version: string) {
  try {
    // await prisma.download.upsert({
    //   where: {
    //     project_version: {
    //       project: project,
    //       version: version,
    //     },
    //   },
    //   create: {
    //     project: project,
    //     version: version,
    //     downloads: 1,
    //   },
    //   update: {
    //     downloads: {
    //       increment: 1,
    //     },
    //   },
    // });
  } catch (e) {
    console.log("An error has occurred: " + e);
  }
}
