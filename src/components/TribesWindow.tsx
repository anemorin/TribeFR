import { styled } from "styled-components";
import useStores from "../hooks/useStores";
import TribesList from "./TribesList";
import { TribeTree } from "./TribeTree";
import { TribeTaskList } from "./TribeTaskList";
import ErrorModal from "./ErrorModal";
import { runInAction } from "mobx";
import SuccessStateStore from "../stores/StateStores/SuccessStateStore";
import { observer } from "mobx-react";

const TribesWindowBody = styled.div`
  display: flex;
  padding-top: 24px;
  width: 100%;
  justify-content: space-between;
  height: 100%;
  overflow: auto;
`

const TribesWindow = observer(() => {
  const { tribesStore } = useStores();
  console.warn("TribesWindow");
  return (
    <TribesWindowBody>
      <TribesList />
      <TribeTree />
      <TribeTaskList />
      {
        tribesStore.state?.isError && (
          <ErrorModal
            onClose={() => {
              runInAction(() => {
                tribesStore.state = new SuccessStateStore();
              })
            }}
            state={tribesStore.state}
          />
        )
      }
    </TribesWindowBody>
  );
});

export { TribesWindow };
