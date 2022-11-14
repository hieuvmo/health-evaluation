import { Button, Form } from "antd";

import BackgroundImage from "assets/background.jpg";
import style from "styles/App.module.css";
import TextField from "components/TextField";
import { IHealth } from "types/health.model";
import {
  getBloodPressureMembership,
  getBmiMembership,
  getHeartBeatMembership
} from "helpers/membership";
import { getBmiValue } from "helpers/bmi";
import { getRuleFunctionByFuzzifier } from "helpers/fuzzifier";

const App = () => {
  const [form] = Form.useForm<IHealth>();

  const onFinish = (values: IHealth) => {
    const bmiObj = getBmiMembership(getBmiValue(values.height, values.weight));
    const heartbeatObj = getHeartBeatMembership(values.heartbeat);
    const bloodPressureObj = getBloodPressureMembership(values.systolic);
    console.log(
      "fuzzifier",
      getRuleFunctionByFuzzifier(bmiObj, heartbeatObj, bloodPressureObj)
    );
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
        <Form onFinish={onFinish} form={form}>
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
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
