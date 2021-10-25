type CategoryTypeNumber = 0 | 1 | 2;

type TaskType = 'assign' | 'quiz';

type SubmissionState = '未提出' | '提出済み';

type ListRow = [string, string, TaskType, string, SubmissionState];

interface TaskObj {
  taskName: string;
  className: string;
  type: TaskType;
  deadline: string;
  submissionState: SubmissionState;
}
