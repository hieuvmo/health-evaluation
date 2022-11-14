import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";

import BackgroundImage from "assets/background.jpg";
import style from "styles/App.module.css";
import TextField from "components/TextField";
import { IHealth } from "types/health.model";
import {
  getBloodPressureMembership,
  getBmiMembership,
  getHeartBeatMembership,
  getOutputMembership
} from "helpers/membership";
import { getBmiValue } from "helpers/bmi";
import { getRuleFunctionByFuzzifier } from "helpers/fuzzifier";
import { getDefuzzifierResult } from "helpers/defuzzifier";

const App = () => {
  const [form] = useForm<IHealth>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [finalResult, setFinalResult] = useState<string>("");

  const handleClickConfirm = () => {
    setOpenModal(false);
  };

  const handleSubmitForm = (values: IHealth) => {
    //Bước 3
    const bmiMembership = getBmiMembership(
      getBmiValue(values.height, values.weight)
    );
    const heartbeatMembership = getHeartBeatMembership(values.heartbeat);
    const bloodPressureMembership = getBloodPressureMembership(values.systolic);
    //Bước 4
    const ruleFunction = getRuleFunctionByFuzzifier(
      bmiMembership,
      heartbeatMembership,
      bloodPressureMembership
    );
    //Bước 5
    const defuzzifierRes = getDefuzzifierResult(ruleFunction);
    //Bước 6
    const result = getOutputMembership(defuzzifierRes);
    setFinalResult(result);
    setOpenModal(true);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div
      className={style.container}
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className={style["container-form"]}>
        <Form onFinish={handleSubmitForm} form={form}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "24px",
              marginBottom: "24px"
            }}
          >
            Hệ thống đánh giá chỉ số sức khỏe
          </h2>

          <Form.Item
            name="height"
            rules={[
              { required: true, message: "Chiều cao là trường bắt buộc" }
            ]}
          >
            <TextField
              label="Chiều cao"
              placeholder="Nhập chiều cao của bạn"
              allowClear
              suffix="cm"
            />
          </Form.Item>
          <Form.Item
            name="weight"
            rules={[{ required: true, message: "Cân nặng là trường bắt buộc" }]}
          >
            <TextField
              label="Cân nặng"
              placeholder="Nhập cân nặng của bạn"
              allowClear
              suffix="kg"
            />
          </Form.Item>
          <Form.Item
            name="heartbeat"
            rules={[{ required: true, message: "Nhịp tim là trường bắt buộc" }]}
          >
            <TextField
              label="Nhịp tim"
              placeholder="Nhập nhịp tim của bạn"
              allowClear
              suffix="lần/phút"
            />
          </Form.Item>

          <div className={style["blood-pressure"]}>
            <Form.Item
              name="systolic"
              rules={[
                { required: true, message: "Huyết áp là trường bắt buộc" }
              ]}
            >
              <TextField
                label="Huyết áp"
                placeholder="Tâm thu"
                suffix="mmHg"
                allowClear
              />
            </Form.Item>
            <span
              style={{
                marginBlock: "auto",
                marginInline: "4px",
                fontSize: "20px"
              }}
            >
              /
            </span>
            <Form.Item
              name="diastolic"
              rules={[
                { required: true, message: "Huyết áp là trường bắt buộc" }
              ]}
            >
              <TextField placeholder="Tâm trương" suffix="mmHg" allowClear />
            </Form.Item>
          </div>

          <Form.Item
            style={{ display: "flex", justifyContent: "end", marginTop: "8px" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "16px" }}
            >
              Thực hiện
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title="Kết quả"
        open={openModal}
        onOk={handleClickConfirm}
        footer={[
          <Button key="submit" type="primary" onClick={handleClickConfirm}>
            Xác nhận
          </Button>
        ]}
      >
        <div
          style={{ fontSize: "18px", fontWeight: 500, paddingBlock: "16px" }}
        >
          {finalResult}
        </div>
      </Modal>
    </div>
  );
};

export default App;
