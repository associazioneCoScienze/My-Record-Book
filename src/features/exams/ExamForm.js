import { Checkbox, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

function ExamForm({ initialValues, isEditing, isVisible, onSave, onCancel }) {
  const [form] = Form.useForm();

  const [isFormValid, setIsFormValid] = useState(false);

  const titleLabel = useMemo(() => {
    return isEditing ? "Modifica esame" : "Aggiungi esame";
  }, [isEditing]);
  const primaryButtonLabel = useMemo(() => {
    return isEditing ? "Salva" : "Aggiungi";
  }, [isEditing]);

  const checkFormValid = useCallback(async () => {
    let toRet = true;
    try {
      await form.validateFields();
    } catch (e) {
      toRet = e.errorFields.length === 0;
    }
    setIsFormValid(toRet);
  }, [form]);

  const handleSave = useCallback(() => {
    const fieldsValue = form.getFieldsValue();
    onSave(fieldsValue);
  }, [form, onSave]);

  useEffect(() => {
    if (isVisible) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [form, initialValues, isVisible]);

  return (
    <Modal
      title={titleLabel}
      visible={!!isVisible}
      onOk={handleSave}
      onCancel={onCancel}
      okButtonProps={{ disabled: !isFormValid }}
      cancelText="Annulla"
      okText={primaryButtonLabel}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmitCapture={handleSave}
        onValuesChange={checkFormValid}
      >
        <Form.Item
          label="Nome Esame"
          name="name"
          rules={[{ required: true, message: "Inserisci il nome" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Crediti"
          name="ects"
          rules={[{ required: true, message: "Inserisci i crediti" }]}
        >
          <InputNumber max={180} />
        </Form.Item>

        <Form.Item label="Data" name="date">
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item label="Voto" name="grade">
          <InputNumber min={18} max={30} />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.grade !== currentValues.grade
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("grade") === 30 ? (
              <Form.Item label="Lode" name="honors" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ExamForm;
