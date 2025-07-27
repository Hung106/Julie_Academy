import { useSearchParams } from 'react-router-dom';

export default function QuestionEditorForm() {
  const [searchParams] = useSearchParams();
  const questionType = searchParams.get('type');

  // Giờ bạn đã có 'questionType' để quyết định hiển thị form nào
  // ...
}