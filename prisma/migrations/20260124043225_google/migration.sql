-- CreateTable
CREATE TABLE "GoogleToken" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "authProfile" BOOLEAN NOT NULL DEFAULT false,
    "authGmail" BOOLEAN NOT NULL DEFAULT false,
    "authCalendar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GoogleToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoogleToken" ADD CONSTRAINT "GoogleToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
