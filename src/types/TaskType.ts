export type TaskType = {
    title: string,
    description: string | undefined,
    createdTime: number,
    expectedCompletedTime: string | undefined,
    isCompleted: boolean,
    id: number,
}