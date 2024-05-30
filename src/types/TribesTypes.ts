export type TribeType = {
  name: string;
  creatorId: string;
  id: string;
  participantsIds?: string[];
  positions?: UserPositionType[]
};

export type UserType = {
  id: string;
  email: string;
}

export type UserPositionType = {
  userId: string;
  parentIds: string[];
  childrenIds: string[];
}

export type TaskType = {
  id: string,
  name: "string",
  status: 0,
  content: {
    sections: SectionType[]
  },
  tribeId: string,
  creatorId: string,
  performerId: string
}

type SectionType = {
  label: string,
  input: {
    content: string
  }
}

