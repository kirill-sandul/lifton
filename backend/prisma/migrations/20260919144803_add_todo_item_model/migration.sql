-- CreateTable
CREATE TABLE "TrainerTodoItem" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "trainerProfileId" TEXT NOT NULL,

    CONSTRAINT "TrainerTodoItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainerTodoItem" ADD CONSTRAINT "TrainerTodoItem_trainerProfileId_fkey" FOREIGN KEY ("trainerProfileId") REFERENCES "TrainerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
