-- CreateTable
CREATE TABLE "Timer" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timer_ownerId_key" ON "Timer"("ownerId");

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
