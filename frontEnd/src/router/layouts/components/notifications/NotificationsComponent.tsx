import { notificationsComponent } from "@/src/router/styles";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { ToastContentProps } from "react-toastify";

interface ProgressBarProps {
  toCloseAt?: number | false;
  isPaused?: boolean;
  startTime?: number;
  onClose?: ((reason?: string | boolean | undefined) => void) | undefined;
}

export const ProgressBar = ({
  toCloseAt,
  isPaused,
  startTime = 0,
  onClose,
}: ProgressBarProps) => {
  const [progressBar, setProgressBar] = useState<number>(0);
  useEffect(() => {
    if (toCloseAt && !isPaused) {
      const timeId = setTimeout(() => {
        const elapsed = Date.now() - startTime;
        const remaining = toCloseAt - elapsed - 10;
        setProgressBar(Math.max(remaining, 0));
        if (remaining <= 0 || onClose) {
          setProgressBar(0);
          clearTimeout(timeId);
        }
      }, 50);
    }
  });
  return (
    <>
      {toCloseAt && progressBar > 0 ? (
        <progress value={(progressBar * 100) / toCloseAt} max={100}></progress>
      ) : (
        ""
      )}
    </>
  );
};

interface NotificationsComponentProps extends Partial<ToastContentProps> {
  message: string;
  reject?: () => void;
  accept?: () => void;
  onClose?: ((reason?: string | boolean | undefined) => void) | undefined;
}

const NotificationsComponent = ({
  message,
  reject,
  accept,
}: NotificationsComponentProps) => {
  return (
    <>
      <div className={notificationsComponent}>
        <div className="notification-message-reject-accept">
          <div className="notification-message">{message}</div>
          <div className="notification-reject-accept">
            <div className="notification-reject" onClick={reject}>
              <ImCross color="red" />
            </div>
            <div className="notification-accept" onClick={accept}>
              <FaCheck color="greenyellow" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsComponent;
