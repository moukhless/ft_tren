import history from "history/browser";
import { memo } from "react";
import { backwardAtHistory } from "../../styles";
import { MdArrowBackIosNew } from "react-icons/md";

const BackwardAtHistory = () => {
  return (
    <>
      <div className={backwardAtHistory} onClick={() => history.back()}>
        <MdArrowBackIosNew color="coral" size={32} className="" />
        <div className="">Back</div>
      </div>
    </>
  );
};

export default memo(BackwardAtHistory);
