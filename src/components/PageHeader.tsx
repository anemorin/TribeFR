import { styled } from "styled-components";
import { Button } from "./ui/Button";
import { icons } from "../enums";
import { Icon } from "./ui/Icon";
import { useNavigate } from "react-router-dom";
import UseStores from "../hooks/useStores";
import { observer } from "mobx-react";
import { useState } from "react";
import ModalSearchWindow from "./Modal";

const HeaderBody = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  position: sticky;
  align-items: center;
  border-bottom: 1px solid black;
`

const RightBlock = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ExitButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 0 12px;
`

const Logo = styled.div`
  font-weight: 500;
  font-size: 24px;
  text-decoration: underline;
  cursor: pointer;
`

const Profile = styled.div`
  border-radius: 50%;
  border: 1px solid black;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProfileBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const ProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PageHeader = observer(() => {
  const navigate = useNavigate();
  const { userStore, tribesStore } = UseStores();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <HeaderBody>
      <Logo
        onClick={() => navigate('/')}
      >
        Tribe
      </Logo>
      <RightBlock>
        <ProfileBlock
          onClick={() => setModalIsOpen(true)}
        >
          <Profile>
            <Icon
              icon={icons.profile}
              size={24}
              isBlack
            />
          </Profile>
          <div>
            {userStore.user?.email}
          </div>
        </ProfileBlock>
      </RightBlock>
      {
        modalIsOpen && (
          <ModalSearchWindow
            onClose={() => setModalIsOpen(false)}
            title="Профиль"
          >
            <ProfileModal>
              <ProfileBlock>
                <Profile>
                  <Icon
                    icon={icons.profile}
                    size={48}
                    isBlack
                  />
                </Profile>
                <div>
                  {userStore.user?.email}
                </div>
              </ProfileBlock>

              <Button
                onClick={() => {
                  tribesStore.clearStore();
                  userStore.Logout();

                }}
                text={
                  <ExitButton>
                    <span>Выйти</span>
                    <Icon icon={icons.exit}/>
                  </ExitButton>
                }
                noPadding
              />
            </ProfileModal>

          </ModalSearchWindow>
        )
      }
    </HeaderBody>
  );
});

export { PageHeader };
