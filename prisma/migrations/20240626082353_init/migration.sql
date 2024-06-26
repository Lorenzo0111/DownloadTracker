-- CreateTable
CREATE TABLE "Download" (
    "project" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "downloads" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("project", "version")
);
