import "./App.css";

import { useCallback, useMemo, useState } from "react";
import MainTemplate from "./ui/MainTemplate";
import ExamsList from "./features/exams/ExamsList";
import useExam from "./features/exams/useExam";
import ExamForm from "./features/exams/ExamForm";

const NEW_ID = "new";
const VOID_ID = "";

function App() {
  const { defaultValue, items, statistics, add, edit, remove } = useExam();

  const [editingExamId, setEditingExamId] = useState(VOID_ID);
  const initialFormValues = useMemo(() => {
    return { ...defaultValue, ...items.find((e) => e.key === editingExamId) };
  }, [defaultValue, editingExamId, items]);

  const handleSave = useCallback(
    (fieldsValue) => {
      if (editingExamId === NEW_ID) {
        add(fieldsValue);
      } else {
        edit(fieldsValue, editingExamId);
      }
      setEditingExamId(VOID_ID);
    },
    [add, edit, editingExamId]
  );

  return (
    <div className="App">
      <ExamForm
        isVisible={!!editingExamId}
        isEditing={editingExamId !== NEW_ID}
        initialValues={initialFormValues}
        onCancel={() => setEditingExamId(VOID_ID)}
        onSave={handleSave}
      />

      <MainTemplate
        title="Libretto universitario"
        actionText="Aggiungi esame"
        onActionClick={() => setEditingExamId(NEW_ID)}
      >
        <ExamsList
          items={items}
          statistics={statistics}
          onEdit={setEditingExamId}
          onRemove={remove}
        />
      </MainTemplate>
    </div>
  );
}

export default App;
